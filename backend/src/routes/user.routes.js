const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgetPassword,
} = require("../controllers/user.controller");

const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/reset-password/:token", (req, res) => {
  const token = req.params.token;

  if (!token) {
    return res.status(404).json({
      message: "token not found! bad request",
    });
  }

  const decode = jwt.verify(token, process.env.JWT_RAW_SECRET);

  res.render("index.ejs", {
    userData_id: decode.id,
  });
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.post("/forget-password", forgetPassword);
router.post("/update-password", async (req, res) => {
  try {
    // Fixed: Get id from request body instead of params to avoid 404
    const id = req.body.id;
    const password = req.body.password;

    // Hash the password before updating, as findByIdAndUpdate doesn't trigger pre-save hook
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("Original password", password);
    
    if (!id) {
      return res.status(404).json({
        msg: "Bad request, something went wrong",
      });
    }

    // Fixed: findByIdAndUpdate expects the id directly, not an object
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {
        password: hashedPassword,
      }
    );

    // console.log("user password", password, id);
    // console.log("Password updated", updatedUser);;
    
    // Render the page with success message instead of JSON
    return res.render("index.ejs", {
      userData_id: id,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log("Error in update password", error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
});

module.exports = router;

