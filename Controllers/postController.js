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

  const likePost = async(req,res,next)=>{
    const postId = req.params.id
    const like = req.body.like
    if(like){
    await Post.updateOne(
        {_id:postId},
        { $inc: { likes: 1 } }
     )
     res.status(200).json({success:true,msg:"like added"})
    }
    if(!like){
      await Post.updateOne(
        {_id:postId},
        { $inc: { likes: -1 } }
     )
     res.status(200).json({success:true,msg:"like removed"})
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

  const toggleLikePost = async (req, res, next) => {
    try {
      const postId = req.params.id;
      const userId = req.body.userId;
  
      const post = await Post.findOne({ _id: postId });
      if (!post) {
        console.log(`Post with ID ${postId} not found.`);
        return res.status(404).json({ message: `Post with ID ${postId} not found.` });
      }
  
      const likes = post.likes || [];
      const index = likes.indexOf(userId);
      if (index >= 0) {
        likes.splice(index, 1); // User has already liked the post, so remove their like
        console.log(`Disliked post with ID ${postId}.`);
        await Post.updateOne({ _id: postId }, { $set: { likes } });
        return res.status(200).json({ message: `Post with ID ${postId} disliked successfully.` });
      } else {
        likes.push(userId); // User has not liked the post yet, so add their like
        console.log(`Liked post with ID ${postId}.`);
        await Post.updateOne({ _id: postId }, { $set: { likes } });
        return res.status(200).json({ message: `Post with ID ${postId} Liked successfully.` });
      }
  
    
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: `An error occurred while updating post with ID ${postId}.` });
    }
  };
  

module.exports ={getAll,addPost,getOne,updateOne,deleteOne,likePost,toggleLikePost}