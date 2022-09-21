const User = require('../models/User')
const { Climb, PartnerSearch } = require('../models/Post')
const cloudinary = require("../middleware/cloudinary")

module.exports = {
    getProfile: async (req, res) => {
        if (req.query.myProfileBtn) {
            res.redirect(`/user/${req.user.username}`)
        } else {
            const user = await User.findOne({ username: req.params.username }).lean()

            // DISPLAY ERROR IF THE USER INPUTS A URL THATS NOT AN ACTUAL USER
            if (user) {
                const climbs = await Climb.find({ user: req.user.id })
                const partnerSearches = await PartnerSearch.find({ user: req.user.id })

                // check to see if the current user is requesting their own profile
                const isCurrentUser = req.user.username === req.params.username

                let following = false;
                if (!isCurrentUser) {
                    // check to see if the user is following the account they are requesting
                    following = req.user.profile.following.some(userId => userId.toString() === user._id.toString())
                }

                const { twitter, avatar: { url } } = user.profile

                res.render('profile', { user, climbs, partnerSearches, isCurrentUser, following, twitter, url })
            } else {
                res.sendStatus(404)
            }
        }

    },
    getEditProfile: async (req, res) => {
        try {
            const isCurrentUser = req.user.username === req.params.username

            if (isCurrentUser) {
                res.render('edit-profile', { user: req.user })
            } else {
                res.redirect(`user/${req.params.username}`)
            }
        } catch (err) {
            console.error(err)
            res.redirect(`/user/${req.user.username}`)
        }
    },
    updateProfile: async (req, res) => {
        try {
            if (req.params.username === req.user.username) {
                const user = await User.findOne({ _id: req.user._id })
                const { name, location, about, twitter } = req.body;

                if (name) user.profile.name = name.trim()
                if (location) user.profile.location = location.trim()
                if (about) user.profile.about = about.trim()
                if (twitter) user.profile.twitter = twitter.trim().replaceAll(' ', '')

                await user.save()
            }

            res.redirect(`/user/${req.user.username}`)
        } catch (err) {
            console.error(err)
            res.redirect(`/user/edit/${req.user.username}`)
        }
    },
    updateAvatar: async (req, res) => {
        try {
            if (req.params.username === req.user.username) {
                // Upload image to cloudinary
                const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path)


                if (secure_url && public_id) {
                    const user = await User.findOne({ _id: req.user._id })
                    const prevAvatarId = user.profile.avatar.id

                    user.profile.avatar.url = secure_url
                    user.profile.avatar.id = public_id

                    // Delete previous avatar from cloudinary
                    await cloudinary.uploader.destroy(prevAvatarId);
                    await user.save()
                }
            }

            res.redirect(`/user/${req.user.username}`)
        } catch (err) {
            console.error(err)
            res.redirect(`/user/edit/${req.user.username}`)
        }
    },
    follow: async (req, res) => {
        try {
            const currentUser = await User.findOne({ _id: req.user._id })
            const userToFollow = await User.findOne({ username: req.params.username })

            if (!currentUser.profile.following.includes(userToFollow._id)) {
                currentUser.profile.following.push(userToFollow._id)
                userToFollow.profile.followers.push(currentUser._id)

                await currentUser.save()
                await userToFollow.save()
            }

            res.redirect(`/user/${req.params.username}`)
        } catch (err) {
            console.error(err)
            res.redirect(`/user/${req.user.username}`)
        }
    },
    unfollow: async (req, res) => {
        try {
            const currentUser = await User.findOne({ _id: req.user._id })
            const userToFollow = await User.findOne({ username: req.params.username })

            if (currentUser.profile.following.includes(userToFollow._id)) {
                const currentUserArr = currentUser.profile.following
                const userToFollowArr = userToFollow.profile.followers

                currentUserArr.splice(currentUserArr.indexOf(userToFollow._id), 1)
                userToFollowArr.splice(userToFollowArr.indexOf(currentUser._id), 1)

                await currentUser.save()
                await userToFollow.save()
            }

            res.redirect(`/user/${req.params.username}`)
        } catch (err) {
            console.error(err)
            res.redirect(`/user/${req.user.username}`)
        }
    },
}