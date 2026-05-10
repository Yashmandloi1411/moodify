const { body, validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  } else {
    return res.status(400).json({ error: errors.array() });
  }
};

const registerValidator = [
  body("username")
    .trim()
    .notEmpty()
    .isString()
    .withMessage("username must be a string"),

  body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage("email must be a valid email address"),

  body("password")
    .trim()
    .notEmpty()
    .isLength({ min: 4, max: 10 })
    .withMessage("password must be between 3 and 10 characters"),
  validate,
];

// const loginValidator = [
//   body("username")
//     .trim()
//     .notEmpty()
//     .isString()
//     .withMessage("username must be a string"),

//   body("email")
//     .trim()
//     .notEmpty()
//     .isEmail()
//     .withMessage("email must be a valid email address"),
//   body("password")
//     .trim()
//     .notEmpty()
//     .isLength({ min: 3, max: 10 })
//     .withMessage("password must be between 3 and 10 characters"),
//   validate,
// ];

const loginValidator = [
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 3, max: 10 })
    .withMessage("password must be between 3 and 10 characters"),

  body().custom((value, { req }) => {
    const { email, username } = req.body;

    // at least one required
    if (!email && !username) {
      throw new Error("email or username is required");
    }

    // if email exists then validate it
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        throw new Error("invalid email format");
      }
    }

    return true;
  }),

  validate,
];

module.exports = {
  registerValidator,
  loginValidator,
  validate,
};
