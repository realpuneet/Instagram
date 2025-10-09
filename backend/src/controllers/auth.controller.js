const userModel = require("../models/user.model");
const cacheClient = require("../services/cache.service");
const { sendMail } = require("../services/mail.service");
const { default: emailTemplate } = require("../utils/emailTemplate.utils");
const { generateToken } = require("../utils/jwt.utils");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;

    // Determine if email field contains email or mobile
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const userEmail = isEmail ? email : null;
    const mobile = !isEmail ? email : null;

    // Validate that either email or mobile is provided
    if (!userEmail && !mobile) {
      return res.status(400).json({
        message: "Either email or mobile number is required",
      });
    }

    const isUserAlreadyExist = await userModel.findOne({
      $or: [{ email: userEmail }, { username }, { mobile }],
    });

    if (isUserAlreadyExist) {
      return res.status(409).json({
        message: "User already exists!",
      });
    }

    const newUser = await userModel.create({
      fullName,
      username,
      email: userEmail,
      mobile,
      password,
    });

    if (!newUser)
      return res.status(400).json({
        message: "Error in registering user",
      });

    const token = generateToken({ id: newUser._id });
    res.cookie("token", token);

    return res.status(201).json({
      message: "User Registered Successfully",
      user: newUser,
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    const user = await userModel.findOne({
      $or: [
        { email: emailOrUsername },
        { username: emailOrUsername },
        { mobile: emailOrUsername }
      ],
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found!" });
    }

    const decryptPassword = await user.comparePassword(password);

    if (!decryptPassword) {
      return res.status(401).json({
        msg: "Invalid Credentials",
      });
    }

    const token = generateToken({ id: user._id });

    res.cookie("token", token);

    return res.status(200).json({
      msg: "User Logged In Successfully",
      user: user,
    });
  } catch (error) {
    console.log("Login error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(404).json({
        message: "Token not found, Unauthorize user",
      });
    }

    await cacheClient.set(token, "blacklisted");

    res.clearCookie("token");

    return res.status(200).json({
      msg: "Logged Out successfully",
    });
  } catch (error) {
    console.log("Logout Error", error);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    return res.status(200).json({
      user: user,
    });
  } catch (error) {
    console.log("Get Current User Error", error);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};


const forgetPassword = async (req, res) => {
  try {
    const { email, username, mobile } = req.body;

    const userData = await userModel.findOne({
      $or: [{ username }, { email }, { mobile }],
    });

    if (!userData) {
      return res.status(404).json({ msg: "User not found!" });
    }

    let rawToken = jwt.sign({ id: userData._id }, process.env.JWT_RAW_SECRET, {
      expiresIn: "30m",
    });

    const resetLink = `http://localhost:3000/api/auth/reset-password/${rawToken}`;

    const resetTemplate = emailTemplate({
      username: userData.username,
      resetLink,
    });

    const mailResult = await sendMail(
      userData.email,
      "Reset Password",
      resetTemplate
    );

    return res.status(200).json({
      msg: "Reset link sent to your email",
    });

  } catch (error) {
    console.log("error=> ", error);

    return res.status(500).json({ msg: "Internal server error", err: error });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  forgetPassword,
  getCurrentUser,
};
