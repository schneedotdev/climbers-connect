const mongoose = require('mongoose')

const ClimbSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const PartnerSearchSchema = new mongoose.Schema({
    area: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
        trim: true,
        maxLength: 1000,
    },
    date: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const PostSchema = {
    Climb: mongoose.model('Climb', ClimbSchema),
    PartnerSearch: mongoose.model('PartnerSearch', PartnerSearchSchema)
}

module.exports = PostSchema