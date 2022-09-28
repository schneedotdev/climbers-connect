const User = require('../models/User')
const Profile = require('../models/Profile')
const { Climb, Connect } = require('../models/Post')
const cloudinary = require("../middleware/cloudinary")
const { findOne } = require('../models/User')

module.exports = {
  getFeed: async (req, res) => {
    try {
      let climbs = await Climb.find()
      let connects = await Connect.find()

      climbs = await Promise.all(climbs.map(async (climb) => {
        const profile = await Profile.findOne({ user: climb.user })
        return await [climb, profile.avatar.url]
      }))

      connects = await Promise.all(connects.map(async (connect) => {
        const profile = await Profile.findOne({ user: connect.user })
        return await [connect, profile.avatar.url]
      }))

      res.render('feed', { user: req.user, climbs, connects })
    } catch (err) {
      console.error(err)
      res.redirect(`/user/${req.user.username}`)
    }
  },
  getFollowing: async (req, res) => {
    try {
      const { following } = await Profile.findOne({ user: req.user._id })

      let { climbs, connects } = await following.reduce(async (posts, userId) => {
        const climbPosts = await Climb.find({ user: userId })
        const connectPosts = await Connect.find({ user: userId })

        if (climbPosts) (await posts).climbs.push(...climbPosts)
        if (connectPosts) (await posts).connects.push(...connectPosts)

        return await posts
      }, { climbs: [], connects: [] })

      climbs = await Promise.all(climbs.map(async (climb) => {
        const profile = await Profile.findOne({ user: climb.user })
        return await [climb, profile.avatar.url]
      }))

      connects = await Promise.all(connects.map(async (connect) => {
        const profile = await Profile.findOne({ user: connect.user })
        return await [connect, profile.avatar.url]
      }))

      res.render('following', { user: req.user, climbs, connects })
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
  getClimbPost: async (req, res) => {
    const post = await Climb.findOne({ _id: req.params.id })
    res.render('post', { user: req.user, post })
  },
  getConnectPost: async (req, res) => {
    const post = await Connect.findOne({ _id: req.params.id })
    res.render('post', { user: req.user, post })
  }
}