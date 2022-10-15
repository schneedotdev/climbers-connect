const User = require('../models/User')
const Profile = require('../models/Profile')
const Post = require('../models/Post')
const Comment = require('../models/Comment')

module.exports = {
    createComment: async (req, res) => {
        try {
            const post = await Post.findOne({ _id: req.body.post_id })
            const comment = await Comment.create({
                text: req.body.comment.trim(),
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
    deleteComment: async (req, res) => {
        try {
            // find the comment, the user who made the comment and the post it belongs to
            const comment = await Comment.findById(req.params.id)
            const post = await Post.findOne({ _id: req.query.postId })

            post.comments = post.comments.filter(id => id.toString() !== req.params.id.toString())
            await post.save()
            await Comment.remove({ _id: req.params.id })

            console.log('deleted comment')
            res.redirect(`/posts/${req.query.postId}`)
        } catch (err) {
            console.log(err)
            res.redirect(`/posts/${req.query.postId}`)
        }
    },
}

function formatDate(date) {
    // converts date month into short hand representation example: "Mar" for "March"
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear()
    return `${month} ${year}`
}