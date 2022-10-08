const mongoose = require('mongoose')

const ClimbSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    grade: {
        type: String,
        required: true
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
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const ConnectSchema = new mongoose.Schema({
    area: {
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
        maxLength: 1000,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const PostSchema = {
    Climb: mongoose.model('Climb', ClimbSchema),
    Connect: mongoose.model('Connect', ConnectSchema)
}

module.exports = PostSchema