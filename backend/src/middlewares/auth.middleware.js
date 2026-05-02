const userModel = require("../models/user.model");
const blackListModel = require("../models/blacklist.model");
const jwt = require("jsonwebtoken");

const redis = require("../config/cache");

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token not provided",
    });
  }

  // token blacklist check in db (for beginner)
  // const isTokenBlackListed = await blackListModel.findOne({ token });
  // token blacklist check in reddis

  const isTokenBlackListed = await redis.get(token);
  if (isTokenBlackListed) {
    return res.status(401).json({
      message: "Token is blacklisted",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}

module.exports = { authUser };
