const { ObjectId } = require("mongodb");
const Post = require("../Model/postSchema");
const createError = require("http-errors");

const getAll = async (req, res, next) => {
    try {
      //get all posts
      const allPost = await Post.find({});
      res.status(200).json({ success: true, allPost });
    } catch (error) {
      next(error);
    }
}

const addPost =async(req, res, next) => {
    try {
        const userId = new ObjectId(req.body.userId)
        const {content,tags} = req.body

        const post = await Post.create({userId,content,tags})
        await post.save()
        res.status(200).json({success:true,msg:"post created",post})
    } catch (error) {
        next(error);
    }
  }
const getOne =async (req, res, next) => {
    try {
      const post = await Post.findOne({ _id: req.params.id });
      if (!post) throw createError.NotFound("No post found");
      res.status(200).json({ success: true, post });
    } catch (error) {
      next(error);
    }
  }
const updateOne = async (req, res, next) => {
    try {
      const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res
        .status(200)
        .json({ success: true, message: "updated successfully", post });
    } catch (error) {
      next(error);
    }
  }

const deleteOne =async (req, res, next) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      if (!post) throw createError.NotFound("No post found");
      res
        .status(200)
        .json({ success: true, message: "deleted successfully", post });
    } catch (error) {
      next(error);
    }
  }
module.exports ={getAll,addPost,getOne,updateOne,deleteOne}