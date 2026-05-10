const { body, query, validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  } else {
    return res.status(400).json({ error: errors.array() });
  }
};

const uploadSongValidator = [
  body("mood").trim().notEmpty().withMessage("mood is required"),

  body().custom((value, { req }) => {
    if (!req.file) {
      throw new Error("song file is required");
    }

    if (req.file.mimetype !== "audio/mpeg") {
      throw new Error("only mp3 files are allowed");
    }

    return true;
  }),

  validate,
];

const getSongsValidator = [
  query("mood")
    .trim()
    .notEmpty()
    .isString()
    .withMessage("mood must be a string"),
  validate,
];

module.exports = {
  uploadSongValidator,
  getSongsValidator,
  validate,
};
