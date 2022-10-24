import Post from '../models/Post'
import Comment from '../models/Comment'

export default {
    createComment: async (req, res) => {
        try {
            const post = await Post.findOne({ _id: req.body.post_id })
            if (!post) throw 'Post does not exist'

            const comment = await Comment.create({
                text: req.body.comment.trim(),
                user: req.user._id,
                post: req.body.post_id,
            })

            post.comments.push({ type: comment._id, ref: 'Comment' })
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
            await Post.findOneAndUpdate(
                { _id: req.query.postId }, // find the document
                { $pull: { comments: req.params.id } } // delete the objectId from an array of ObjectId's
            )
            await Comment.deleteOne({ _id: req.params.id })

            console.log('deleted comment')
            res.redirect(`/posts/${req.query.postId}`)
        } catch (err) {
            console.log(err)
            res.redirect(`/posts/${req.query.postId}`)
        }
    },
}