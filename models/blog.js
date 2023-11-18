const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

//TODO: blogSchema format

module.exports = mongoose.model('Blog', blogSchema)