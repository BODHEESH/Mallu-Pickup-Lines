const router = require("express").Router();
const { getAll, addPost, getOne, updateOne, deleteOne } = require("../Controllers/postController");


router
  .route("/posts")
  .get(getAll)
  .post(addPost);


// post by id
router
  .route("/post/:id")
  .get(getOne)
  .put(updateOne)
  .delete(deleteOne);

module.exports = router;