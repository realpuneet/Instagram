const userModel = require("../models/user.model");

const followUser = async (req, res) => {
  try {
    let user_id = req.params.user_id;

    if (!user_id)
      return res.status(404).json({
        msg: "User id not found!",
      });

    const currentUser = await userModel.findById(req.user._id);

    currentUser.following.push(user_id);
    currentUser.save();

    const followedUser = await userModel.findById(user_id);

    followedUser.followers.push(req.user._id);
    followedUser.save();

    return res.status(200).json({
      msg: "User Followed",
    });
  } catch (error) {
    console.log("Error in follow", error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    if (!user_id) {
      return res.status(404).json({
        msg: "user id not found",
      });
    }

    const currentUser = await userModel.findById(req.user._id);

    currentUser.following.splice(user_id, 1);
    currentUser.save();

    const unfollowedUser = await userModel.findById(user_id);

    unfollowedUser.followers.splice(req.user._id, 1);
    unfollowedUser.save();

    return res.status(200).json({
      msg: "Unfollowed",
    });
  } catch (error) {
    console.log("Error in follow", error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const blockUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    if (!user_id)
      return res.status(404).json({
        message: "User id not found",
      });

    const currentUser = await UserModel.findById(req.user._id);

    currentUser.blockedUsers.push(user_id);
    currentUser.save();

    return res.status(200).json({msg : "User Blocked"})
    
  } catch (error) {}
};

// const unBlockUserController = async (req, res) => {};


module.exports = {
    followUser,
    unfollowUser,
    blockUser
}