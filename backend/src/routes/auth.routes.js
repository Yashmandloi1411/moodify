const express = require("express");
const Router = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// validation
const authValidation = require("../validation/auth.validation");

router.post(
  "/register",
  authValidation.registerValidator,
  authController.registerUser,
);

router.post("/login", authValidation.loginValidator, authController.loginUser);

router.get("/get-me", authMiddleware.authUser, authController.getUser);

router.delete("/logout", authMiddleware.authUser, authController.logoutUser);
module.exports = router;
