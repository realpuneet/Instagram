const userModel = require("../models/user.model");
const cacheClient = require("../services/cache.service");
const { verifyToken } = require("../utils/jwt.utils");

const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(404).json({ msg: "token not found, Access denied!" });
    }

    const isBlackListed = await cacheClient.get(token);

    if (isBlackListed) {
      return res.status(401).json({
        msg: "Token blacklisted or expired, Access Denied",
      });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(403).json({
        msg: "Invalid Token",
      });
    }

    const user = await userModel.findById(decoded.id);

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in auth middleware", error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};


module.exports = authUser;