const User = require('../models/User')
const Profile = require('../models/Profile')
const { Climb, Connect } = require('../models/Post')
const cloudinary = require("../middleware/cloudinary")

module.exports = {
    getProfile: async (req, res) => {
        try {
            if (req.query.myProfileBtn) {
                res.redirect(`/user/${req.user.username}`)
            } else {
                const user = await User.findOne({ username: req.params.username }).populate('profile').lean()

                // DISPLAY ERROR IF THE USER INPUTS A URL THATS NOT AN ACTUAL USER
                if (!user) throw 'User does not exist'

                // check to see if the current user is requesting their own profile
                const isCurrentUser = req.user.username === req.params.username

                let following = false;
                if (!isCurrentUser) {
                    // check to see if the user is following the account they are requesting
                    const profile = await Profile.findOne({ _id: req.user.profile }).lean()

                    following = profile.following.some(userId => userId.toString() === user._id.toString())
                }

                const climbs = await Climb.find({ user: user._id })
                    .populate('user')
                const connects = await Connect.find({ user: user._id })
                    .populate('user')

                const { twitter, avatar: { url } } = user.profile

                res.render('profile', { user, climbs, connects, isCurrentUser, following, twitter, url })
            }
        } catch (err) {
            console.error(err)
            res.sendStatus(404)
        }
    },
    getEditProfile: async (req, res) => {
        try {
            const isCurrentUser = req.user.username === req.params.username
            const user = await User.findOne({ username: req.user.username })
                .populate('profile').lean()

            if (!isCurrentUser) throw 'User does not have permissions to access this page'

            res.render('edit-profile', { user })
        } catch (err) {
            console.error(err)
            res.redirect(`/user/${req.user.username}`)
        }
    },
    updateProfile: async (req, res) => {
        try {
            if (req.params.username !== req.user.username) throw 'User does not have edit permissions for this profile'

            const user = await User.findOne({ _id: req.user._id })
            const profile = await Profile.findOne({ _id: user.profile })
            const { name, location, about, twitter } = req.body;

            console.log(req.body)

            if (name) profile.name = name.trim()
            if (location) profile.location = location.trim()
            if (about) profile.about = about.trim()
            if (twitter) profile.twitter = twitter.trim().replaceAll(' ', '')

            await profile.save()
            res.redirect(`/user/${req.user.username}`)
        } catch (err) {
            console.error(err)
            res.redirect(`/user/edit/${req.user.username}`)
        }
    },
    updateAvatar: async (req, res) => {
        try {
            if (req.params.username !== req.user.username) throw 'User does not have edit permissions for this profile'

            // Upload image to cloudinary
            const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path)

            // check to see if a new url and id were provided
            if (secure_url && public_id) {
                const user = await User.findOne({ _id: req.user._id })
                const profile = await Profile.findOne({ _id: user.profile })

                // Delete previous avatar from cloudinary
                if (profile.avatar.id) await cloudinary.uploader.destroy(user.profile.avatar.id)

                // assign new url and id
                profile.avatar.url = secure_url
                profile.avatar.id = public_id

                await profile.save()
            }

            res.redirect(`/user/edit/${req.user.username}`)
        } catch (err) {
            console.error(err)
            res.redirect(`/user/${req.user.username}`)
        }
    },
    follow: async (req, res) => {
        try {
            const currentUser = await User.findOne({ _id: req.user._id })
            const userA = await Profile.findOne({ _id: currentUser.profile })
            const userToFollow = await User.findOne({ username: req.params.username })
            const userB = await Profile.findOne({ _id: userToFollow.profile })

            if (!userA.following.includes(userB.user._id)) {
                userA.following.push(userB.user._id)
                userB.followers.push(userA.user._id)


                console.log('userA following: ', userA.following, 'userB followers: ', userB.followers)
                await userA.save()
                await userB.save()
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
            const userA = await Profile.findOne({ _id: currentUser.profile })
            const userToUnfollow = await User.findOne({ username: req.params.username })
            const userB = await Profile.findOne({ _id: userToUnfollow.profile })

            if (userA.following.includes(userB.user._id)) {
                const currentUserArr = userA.following
                const userToUnfollowArr = userB.followers

                currentUserArr.splice(currentUserArr.indexOf(userB.user._id), 1)
                userToUnfollowArr.splice(userToUnfollowArr.indexOf(userA.user._id), 1)

                console.log('userA following: ', userA.following, 'userB followers: ', userB.followers)

                await userA.save()
                await userB.save()
            }

            res.redirect(`/user/${req.params.username}`)
        } catch (err) {
            console.error(err)
            res.redirect(`/user/${req.user.username}`)
        }
    },
}