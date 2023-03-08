const router = require("express").Router();
const { getAll, addPost, getOne, updateOne, deleteOne, likePost } = require("../Controllers/postController");


router
  .route("/posts")
  .get(getAll)
  .post(addPost);


// post by id
router
  .route("/post/:id")
  .post(likePost)
  .get(getOne)
  .put(updateOne)
  .delete(deleteOne);

module.exports = router;