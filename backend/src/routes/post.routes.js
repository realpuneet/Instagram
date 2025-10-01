const express = require('express');
const router = express.Router();
const { createPost } = require("../controllers/post.controller");
const upload = require("../config/multer");
const authUser = require("../middlewares/auth.middleware");


// Route to create a new post - handler must be a function
// Added authUser for authentication, upload.any() to parse multipart form data for files and body fields
router.post("/create-post", authUser, upload.any(), createPost);


module.exports = router;
