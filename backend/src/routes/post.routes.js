const express = require("express");
const router = express.Router();
const {
  likeController,
  unlikeController,
  getLoggedInUserPosts,
  getAllPostsController,
  createPostController,
  updatePostController,
  deletePostController,
} = require("../controllers/post.controller");
const upload = require("../config/multer");
const authUser = require("../middlewares/auth.middleware");

// Added authUser for authentication, upload.any() to parse multipart form data for files and body fields
router.post("/create-post", authUser, upload.any(), createPostController);
router.post("/update-post", authUser, updatePostController);
router.post("/delete/:post_id", authUser, deletePostController);
router.get("/all-posts", authUser, getAllPostsController);
router.get("/user-posts", authUser, getLoggedInUserPosts);
router.get("/like/:post_id", authUser, likeController);
router.get("/unlike/:post_id", authUser, unlikeController);




module.exports = router;
