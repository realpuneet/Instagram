const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/auth.middleware");
const {followUser, unfollowUser, blockUser, getAllUsers} = require("../controllers/user.controller");


router.get("/all-users", authUser, getAllUsers);

router.get("/follow/:user_id",authUser, followUser);
router.get("/unfollow/:user_id",authUser, unfollowUser);
router.get("/block/:user_id",authUser, blockUser);


module.exports = router;