const express = require("express");
const Router = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

router.get("/get-me", authMiddleware.authUser, authController.getUser);

router.delete("/logout", authMiddleware.authUser, authController.logoutUser);
module.exports = router;
