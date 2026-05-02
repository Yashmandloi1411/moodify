const userModel = require("../models/user.model");

const blackListModel = require("../models/blacklist.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const redis = require("../config/cache");

async function registerUser(req, res) {
  const { username, email, password } = req.body;

  const isAlreadyRegister = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  // email already exist
  if (isAlreadyRegister) {
    return res.status(409).json({
      message: "user already exist",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    email: email,
    username: username,
    password: hashPassword,
  });
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: true,
  });

  return res.status(201).json({
    message: "user created successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

async function loginUser(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel
    .findOne({
      $or: [{ email }, { username }],
    })
    .select("+password");

  if (!user) {
    return res.status(400).json({
      message: "Inavalid credentials",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Inavalid credentials",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: true,
  });

  return res.status(200).json({
    message: "user login successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

async function getUser(req, res) {
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    message: "user fetched successfully",
    user,
  });
}

async function logoutUser(req, res) {
  const token = req.cookies.token;
  await res.clearCookie("token");

  // isma ham token ko blacklist krna h taki wo dobara use na ho ske
  // isliya db me store karvadiya h taki jab bhi user koi request kare to check kr ske ki token blacklist me to nahi h

  // await blackListModel.create({ token });

  // redis me store krne ka tarika

  // 60*60 -> 1hr
  redis.set(token, Date.now().toString(), "EX", 60 * 60);
  return res.status(200).json({
    message: "user logout successfully",
  });
}

module.exports = { registerUser, loginUser, getUser, logoutUser };
