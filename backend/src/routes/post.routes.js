const express = require('express');
const router = express.Router();
const { createPost } = require("../controllers/post.controller");


// Route to create a new post - handler must be a function
router.post("/create-post", createPost);


module.exports = router;
