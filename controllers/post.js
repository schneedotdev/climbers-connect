const User = require('../models/User')
const { Climb, Connect } = require('../models/Post')
const cloudinary = require("../middleware/cloudinary")
const { findOne } = require('../models/User')

module.exports = {
  createClimbPost: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.user.username })
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

      user.profile.posts.push(climb._id)
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

      const connect = await Connect.create({
        area: req.body.area,
        message: req.body.message,
        user: req.user.id,
      })

      console.log(connect)

      user.profile.posts.push(connect._id)
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
}