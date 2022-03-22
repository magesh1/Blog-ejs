const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('myBlog', BlogSchema);