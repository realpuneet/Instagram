const postModel = require("../models/post.model");
const userModel = require("../models/user.model");

const uploadFiles = require("../services/storage.service");

const createPost = async (req, res) => {
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

    const updateUserPosts = await userModel.findByIdAndUpdate(req.user._id, {
      posts: newPost._id,
    });

    if (!newPost) {
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

module.exports = {
    createPost,
}
