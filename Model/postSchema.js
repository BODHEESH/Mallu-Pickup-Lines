const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    userId: mongoose.Schema.ObjectId,
    content: String,
    tags: String,
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }]
},{
    timestamps: true
})

const Post = mongoose.model("Post", postSchema)

module.exports = Post
