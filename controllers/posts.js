const User = require('../models/User')
const Profile = require('../models/Profile')
const Post = require('../models/Post')
const cloudinary = require("../middleware/cloudinary")
const { findOne } = require('../models/User')

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
  createClimbPost: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.user.username })
        .populate('profile')
      // Upload image to cloudinary
      const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path)

      const climb = await Climb.create({
        name: req.body.name,
        grade: req.body.grade,
        image: {
          url: secure_url,
          id: public_id
        },
        rating: req.body.rating,
        user: req.user.id,
      })

      user.profile.posts.climbs.push(climb._id)
      user.save()

      console.log("Climb Post has been added!")
      res.redirect(`/user/${req.user.username}`)
    } catch (err) {
      console.log(err)
      res.redirect(`/user/${req.user.username}`)
    }
  },
  deleteClimbPost: async (req, res) => {
    // try {
    //   // Find post by id
    //   let post = await Climb.findById({ _id: req.params.id })
    //   // Delete image from cloudinary
    //   await cloudinary.uploader.destroy(post.cloudinaryId)
    //   // Delete post from db
    //   await Climb.remove({ _id: req.params.id })

    //   console.log("Deleted Climb Post")
    //   res.redirect(`/user/${req.user.username}`)
    // } catch (err) {
    //   res.redirect(`/user/${req.user.username}`)
    // }
  },
  createConnectPost: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.user.username })
        .populate('profile')

      const connect = await Connect.create({
        area: req.body.area,
        message: req.body.message,
        user: req.user.id,
      })

      user.profile.posts.connects.push(connect._id)
      user.save()

      console.log("Connect Post has been added!")
      res.redirect(`/user/${req.user.username}`)
    } catch (err) {
      console.log(err)
      res.redirect(`/user/${req.user.username}`)
    }
  },
  deleteConnectPost: async (req, res) => {
    // try {
    //   // Find post by id
    //   let post = await Connect.findById({ _id: req.params.id })
    //   // Delete image from cloudinary
    //   await cloudinary.uploader.destroy(post.cloudinaryId)
    //   // Delete post from db
    //   await Connect.remove({ _id: req.params.id })

    //   console.log("Deleted Connect Post")
    //   res.redirect(`/user/${req.user.username}`)
    // } catch (err) {
    //   res.redirect(`/user/${req.user.username}`)
    // }
  },
  getPost: async (req, res) => {
    const user = await User.findOne({ _id: req.user._id })
      .populate('profile')
    const type = req.query.type
    let post

    if (type === 'climb') {
      post = await Climb.findOne({ _id: req.params.id })
    } else {
      post = await Connect.findOne({ _id: req.params.id })
    }

    const date = await formatDate(post.createdAt)

    res.render('post', { user, type, post, date })
  }
}

function formatDate(date) {
  // converts date month into short hand representation example: "Mar" for "March"
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear()
  return `${month} ${year}`
}