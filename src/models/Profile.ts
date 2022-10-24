import mongoose from 'mongoose'

const ProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    avatar: {
        url: {
            type: String,
            default: ''
        },
        id: {
            type: String,
            default: ''
        },
    },
    about: {
        type: String,
        default: "I really love rocks! Checkout the climbs I've sent!"
    },
    location: {
        type: String,
        default: "The Mountains"
    },
    twitter: {
        type: String,
        maxLength: 15,
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

export default mongoose.model('Profile', ProfileSchema)