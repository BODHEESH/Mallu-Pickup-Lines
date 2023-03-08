
const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    userId:mongoose.Schema.ObjectId,
    content:String,
    tags:String,
    likes:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})

const Post = mongoose.model("post",postSchema)

module.exports = Post