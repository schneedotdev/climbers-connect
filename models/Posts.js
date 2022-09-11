const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    cloudinaryId: {
        type: String,
        require: true,
    },
})

module.exports = mongoose.model('Post', PostSchema)