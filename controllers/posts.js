const User = require('../models/User')
const { Climb, PartnerSearch } = require('../models/Post')
const cloudinary = require("../middleware/cloudinary")

module.exports = {
  createClimb: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path)

      await Climb.create({
        name: req.body.name,
        grade: req.body.grade,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        rating: req.body.rating,
        user: req.user.id,
      })

      console.log("Climb Post has been added!")
      res.redirect("/profile")
    } catch (err) {
      console.log(err)
    }
  },
  deleteClimb: async (req, res) => {
    try {
      // Find post by id
      let post = await Climb.findById({ _id: req.params.id })
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId)
      // Delete post from db
      await Climb.remove({ _id: req.params.id })
      console.log("Deleted Climb Post")
      res.redirect("/profile")
    } catch (err) {
      res.redirect("/profile")
    }
  },
  createPartnerSearch: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path)

      await PartnerSearch.create({
        area: req.body.area,
        text: req.body.text,
        date: req.body.date,
        user: req.user.id,
      })

      console.log("ParterSearch Post has been added!")
      res.redirect("/profile")
    } catch (err) {
      console.log(err)
    }
  },
  deletePartnerSearch: async (req, res) => {
    try {
      // Find post by id
      let post = await PartnerSearch.findById({ _id: req.params.id })
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId)
      // Delete post from db
      await PartnerSearch.remove({ _id: req.params.id })

      console.log("Deleted PartnerSearch Post")
      res.redirect("/profile")
    } catch (err) {
      res.redirect("/profile")
    }
  },
}