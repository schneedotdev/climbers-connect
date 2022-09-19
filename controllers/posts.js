const User = require('../models/User')
const { Climb, PartnerSearch } = require('../models/Post')
const cloudinary = require("../middleware/cloudinary")

module.exports = {
  getProfile: async (req, res) => {
    const user = await User.findOne({ username: req.params.username })

    // DISPLAY ERROR IF THE USER INPUTS A URL THATS NOT AN ACTUAL USER
    if (!user) return res.sendStatus(404);

    const climbs = await Climb.find({ user: req.user.id })
    const partnerSearches = await PartnerSearch.find({ user: req.user.id })

    // check to see if the current user is requesting their own profile
    const isCurrentUser = req.user.username === req.params.username

    let following = false;
    if (!isCurrentUser) {
      // check to see if the user is following the account they are requesting
      following = req.user.following.some(userId => userId.toString() === user._id.toString())
    }

    res.render('profile', { user, climbs, partnerSearches, isCurrentUser, following })
  },
  follow: async (req, res) => {
    try {
      const currentUser = await User.findOne({ _id: req.user._id })
      const userToFollow = await User.findOne({ username: req.params.username })

      if (!currentUser.following.includes(userToFollow._id)) {
        currentUser.following.push(userToFollow._id)
        userToFollow.followers.push(currentUser._id)

        currentUser.save()
        userToFollow.save()
      }

      res.redirect(`/user/${req.params.username}`)
    } catch (err) {
      console.error(err)
    }
  },
  unfollow: async (req, res) => {
    try {
      const currentUser = await User.findOne({ _id: req.user._id })
      const userToFollow = await User.findOne({ username: req.params.username })

      if (currentUser.following.includes(userToFollow._id)) {
        const currentUserArr = currentUser.following
        const userToFollowArr = userToFollow.followers


        currentUserArr.splice(currentUserArr.indexOf(userToFollow._id), 1)
        userToFollowArr.splice(userToFollowArr.indexOf(currentUser._id), 1)

        currentUser.save()
        userToFollow.save()
      }

      res.redirect(`/user/${req.params.username}`)
    } catch (err) {
      console.error(err)
    }
  },
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