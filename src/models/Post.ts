import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    caption: {
        type: String,
        required: true,
        trim: true,
        maxLength: 1000
    },
    grade: {
        type: String
    },
    image: {
        url: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    likes: {
        type: Number,
        default: 0,
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export default mongoose.model('Post', PostSchema)