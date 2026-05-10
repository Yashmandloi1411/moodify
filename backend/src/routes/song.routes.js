const express = require("express");
const Router = require("express");

const upload = require("../middlewares/upload.middleware");

const router = express.Router();
const songController = require("../controllers/song.controller");

// validation

const songValidation = require("../validation/song.validation");

router.post(
  "/",
  upload.single("song"),
  songValidation.uploadSongValidator,
  songController.uploadSong,
);
router.get("/", songValidation.getSongsValidator, songController.getSongs);
module.exports = router;
