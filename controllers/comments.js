const User = require('../models/User')
const Profile = require('../models/Profile')
const Post = require('../models/Post')
const Comment = require('../models/Comment')

module.exports = {
    createComment: async (req, res) => {
        try {
            const post = await Post.findOne({ _id: req.body.post_id })
            const comment = await Comment.create({
                text: req.body.comment,
                user: req.user._id,
                post: req.body.post_id,
            })

            post.comments.push(comment._id)
            post.save()

            console.log("Comment has been created!")
            res.redirect(`/posts/${post._id}`)
        } catch (err) {
            console.log(err)
            res.redirect(`/posts/${req.body.post_id}`)
        }
    },
}

function formatDate(date) {
    // converts date month into short hand representation example: "Mar" for "March"
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear()
    return `${month} ${year}`
}