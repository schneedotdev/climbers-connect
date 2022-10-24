import User from '../models/User'
import Profile from '../models/Profile'
import Post from '../models/Post'
import cloudinary from "../middleware/cloudinary"

export default {
    getUser: async (req, res) => {
        try {
            res.redirect(`/user/${req.query.user.toLowerCase()}`)
        } catch (err) {
            console.error(err)
            res.redirect(`/user/${req.user.username}`)
        }
    },
    getProfile: async (req, res) => {
        try {
            if (req.query.myProfileBtn) {
                res.redirect(`/user/${req.user.username}`)
            } else {
                const user = await User.findOne({ username: req.params.username.toLowerCase() }).lean()
                if (!user) throw 'User was not found'

                // DISPLAY ERROR IF THE USER INPUTS A URL THATS NOT AN ACTUAL USER
                if (!user) throw 'User does not exist'

                // check to see if the current user is requesting their own profile
                const isCurrentUser = req.user.username === req.params.username.toLowerCase()

                let profile;
                let following = false;
                // if the current user is not the user they are trying to follow, check to see if they are already following the user
                if (!isCurrentUser) {
                    // check to see if the user is following the account they are requesting
                    profile = await Profile.findOne({ _id: req.user.profile }).lean()
                    if (!profile) throw "Users Profile could not be found"

                    following = profile.following.some(userId => userId.toString() === user._id.toString())
                } else {
                    profile = await Profile.findOne({ _id: user.profile })
                    if (!profile) throw "Profile was not found"
                }

                const { twitter, avatar } = profile

                const posts = await Post.find({ user: user._id })
                    .populate('user')

                res.render('profile', { user, profile, posts, isCurrentUser, following, twitter, url: avatar?.url })
            }
        } catch (err) {
            console.error(err)
            res.redirect(`/user/${req.user.username}`)
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
            if (!user) throw 'User could not be found'

            const profile = await Profile.findOne({ _id: user.profile })
            if (!profile) throw 'Profile was not found'
            const { name, location, about, twitter } = req.body

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
            const { secure_url, public_id } = await cloudinary.v2.uploader.upload(req.file.path)

            // check to see if a new url and id were provided
            if (secure_url && public_id) {
                const user = await User.findOne({ _id: req.user._id })
                if (!user) throw 'User was not found'
                const profile = await Profile.findOne({ _id: user.profile })
                if (!profile) throw 'Profile was not found'

                // if the avatar property did not exist, create the property
                if (!profile.avatar) {
                    profile.avatar = {
                        id: '',
                        url: ''
                    }
                }

                // Delete previous avatar from cloudinary
                if (profile.avatar.id) await cloudinary.v2.uploader.destroy(profile.avatar.id)

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
            if (!currentUser) throw 'Current user could not be found'

            const userA = await Profile.findOne({ _id: currentUser.profile })
            if (!userA) throw 'Current users profile could not be found'

            const userToFollow = await User.findOne({ username: req.params.username })
            if (!userToFollow) throw 'User to follow could not be found'
            const userB = await Profile.findOne({ _id: userToFollow.profile })
            if (!userB) throw 'User to follows profile could not be found'

            if (!userA.following.includes(userB.user?._id)) {
                userA.following.push(userB.user?._id)
                userB.followers.push(userA.user?._id)


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
            if (!currentUser) throw 'Current user could not be found'

            const userA = await Profile.findOne({ _id: currentUser.profile })
            if (!userA) throw 'Current users profile could not be found'

            const userToUnfollow = await User.findOne({ username: req.params.username })
            if (!userToUnfollow) throw 'User to unfollow was not found'

            const userB = await Profile.findOne({ _id: userToUnfollow.profile })
            if (!userB) throw 'User to follows profile could not be found'

            if (userA.following.includes(userB.user?._id)) {
                const currentUserArr = userA.following
                const userToUnfollowArr = userB.followers

                currentUserArr.splice(currentUserArr.indexOf(userB.user?._id), 1)
                userToUnfollowArr.splice(userToUnfollowArr.indexOf(userA.user?._id), 1)

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