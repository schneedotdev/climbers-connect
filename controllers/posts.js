const User = require('../models/User')
const Profile = require('../models/Profile')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const cloudinary = require("../middleware/cloudinary")
const moment = require('moment')
moment().format()

module.exports = {
  getFeed: async (req, res) => {
    try {
      let posts = await Post.find()

      posts = await Promise.all(posts.map(async (post) => {
        const profile = await Profile.findOne({ user: post.user })
        return await [post, profile.avatar.url]
      }))

      res.render('feed', { user: req.user, posts })
    } catch (err) {
      console.error(err)
      res.redirect(`/user/${req.user.username}`)
    }
  },
  getFollowing: async (req, res) => {
    try {
      const { following } = await Profile.findOne({ user: req.user._id })

      let posts = await following.reduce(async (posts, userId) => {
        const followerPosts = await Post.find({ user: userId })

        if (followerPosts) (await posts).push(...followerPosts)

        return await posts
      }, [])

      posts = await Promise.all(posts.map(async (post) => {
        const profile = await Profile.findOne({ user: post.user })
        return await [post, profile.avatar.url]
      }))

      res.render('following', { user: req.user, posts })
    } catch (err) {
      console.error(err)
      res.redirect(`/user/${req.user.username}`)
    }
  },
  createPost: async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id })

      // Upload image to cloudinary
      const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path)

      const post = await Post.create({
        title: req.body.title,
        grade: req.body.grade,
        image: {
          url: secure_url,
          id: public_id
        },
        rating: req.body.rating,
        user: req.user.id,
        comments: [],
      })

      profile.posts.push(post._id)
      profile.save()

      console.log("Post has been created!")
      res.redirect(`/user/${req.user.username}`)
    } catch (err) {
      console.log(err)
      res.redirect(`/user/${req.user.username}`)
    }
  },
  deletePost: async (req, res) => {
    try {
      const postId = req.params.id
      // Find post by id
      const post = await Post.findById({ _id: postId })

      // throw error if the current user does not own the post
      if (post.user.toString() !== req.user._id.toString()) throw 'Post does not belong to current user'

      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.image.id)

      // Delete post and comments from db
      await Post.remove({ _id: postId })
      await Comment.remove({ post: postId })

      console.log("Deleted User's Post")
      res.redirect(`/user/${req.user.username}`)
    } catch (err) {
      console.error(err)
      res.redirect(`/posts/${req.params.id}`)
    }
  },
  getPost: async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id })
    const user = await User.findOne({ _id: post.user }).populate('profile')
    const date = await formatDate(post.createdAt)
    const isCurrentUsersPost = post.user.toString() === req.user._id.toString()

    const comments = await Promise.all(post.comments.map(async (comment_id) => {
      const comment = await Comment.findOne({ _id: comment_id })
      const user = await User.findOne({ _id: comment.user }).populate('profile')

      return await { comment, user, date: moment(comment.createdAt).fromNow() }
    }))

    res.render('post', { user, post, comments, date, isCurrentUsersPost })
  }
}

function formatDate(date) {
  // converts date month into short hand representation example: "Mar" for "March"
  const month = date.toLocaleString('default', { month: 'short' })
  const day = date.getDay()
  const year = date.getFullYear()
  const hours = ((date.getHours() % 11) % 12 + 1)
  const minutes = date.getMinutes()
  const timePeriod = date.getHours() <= 12 ? 'AM' : 'PM'
  return `${month} ${day} ${year} at ${hours}:${minutes} ${timePeriod}`
}