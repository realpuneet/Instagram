const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgetPassword,
} = require("../controllers/user.controller");

const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

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
router.post("/update-password/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const password = req.body.password;

    if (!id) {
      return res.status(404).json({
        msg: "Bad request, something went wrong",
      });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      { id },
      {
        password,
      }
    );

    console.log("user password", password, id);
    return res.status(200).json({
      message: "Password updated",
      user: updatedUser,
    });
  } catch (error) {
    console.log("Error in update password", error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
});

module.exports = router;
