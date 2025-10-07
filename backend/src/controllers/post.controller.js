const postModel = require("../models/post.model");
const userModel = require("../models/user.model");
const uploadFiles = require("../services/storage.service");

const getAllPostsController = async (req, res) => {
  try {
    const posts = await postModel.find({});

    if (!posts) {
      return res.status(404).json({
        msg: "No posts yet!",
      });
    }

    return res.status(200).json({
      msg: "All Post Fetched!",
      posts: posts,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const getLoggedInUserPosts = async (req, res) => {
  try {
    const user_id = req.params.user._id;

    if (!user_id) {
      return res.status(404).json({ message: "User Id not found" });
    }

    const loggedInUserPosts = await userModel
      .findById(req.user._id)
      .populate("posts");

    return res.status(200).json({
      message: "logged in user posts fetched",
      userPosts: loggedInUserPosts,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createPostController = async (req, res) => {
  try {
    const { location, caption, tags } = req.body;

    if (!req.files) {
      return res.status(404).json({
        msg: "Image is required!",
      });
    }

    const uploadUrlArr = await Promise.all(
      req.files.map(
        async (post) => await uploadFiles(post.buffer, post.originalname)
      )
    );

    const newPost = await postModel.create({
      user_id: req.user._id,
      location,
      caption,
      imageUrl: uploadUrlArr.map((file) => file.url),
      tags,
    });

    if (newPost) {
      return res
        .status(201)
        .json({ msg: "Post Created Successfully", post: newPost });
    }
  } catch (error) {
    console.log("Error in post creation", error);
    return res.status(500).json({
      msg: "Internal Server Error!",
    });
  }
};

const updatePostController = async (req, res) => {
  try {
    const { post_id, location, caption, url, tags } = req.body;

    const updatePost = await postModel.findByIdAndUpdate(
      { _id: post_id },
      {
        location,
        caption,
        imageUrl: url,
        tags,
      },
      { new: true }
    );

    if (!updatePost) {
      return res.status(400).json({ message: "Bad request, Failed to update" });
    }

    return res
      .status(200)
      .json({ message: "Post Updated!", updatePost: updatePost });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deletePostController = async (req, res) => {
  try {
    const post_id = req.params.post_id;

    if (!post_id) {
      return res.status(404).json({ message: "Post Id not found" });
    }

    await postModel.findByIdAndDelete(post_id);

    return res.status(200).json({ message: "Post Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const likeController = async (req, res) => {
  try {
    const post_id = req.params.post_id;

    if (!post_id) {
      return res.status(404).json({
        msg: "Post not found",
      });
    }

    const currentPost = await postModel.findById(post_id);

    currentPost.likes.push(req.user._id);
    currentPost.save();

    return res.status(200).json({
      msg: "Post Liked",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const unlikeController = async (req, res) => {
  try {
    const post_id = req.params.post_id;

    if (!post_id) {
      return res.status(404).json({
        msg: "post not found",
      });
    }

    const currentPost = await postModel.findById(post_id);

    currentPost.likes.splice(req.user_id, 1);
    currentPost.save();

    return res.status(200).json({
      msg: "Post Unliked",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  getAllPostsController,
  getLoggedInUserPosts,
  createPostController,
  updatePostController,
  deletePostController,
  likeController,
  unlikeController,
};
