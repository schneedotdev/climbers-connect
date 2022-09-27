const mongoose = require('mongoose')

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
    posts: {
        climbs: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Climb'
        }],
        connects: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Connect'
        }],
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Profile', ProfileSchema)