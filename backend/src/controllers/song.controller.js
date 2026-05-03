const songModel = require("../models/song.model");
const multer = require("multer");
const id3 = require("node-id3");
const storageService = require("../services/storage.service");
async function uploadSong(req, res) {
  //   const songfile = req.file;
  //   console.log(songfile);

  const { mood } = req.body;

  const songBuffer = req.file.buffer;
  const tags = await id3.read(req.file.buffer);

  //   const songFile = await storageService.uploadFile({
  //     buffer: songBuffer,
  //     filename: tags.title + ".mp3",
  //     folder: "moodify/songs",
  //   });

  //   const posterFile = await storageService.uploadFile({
  //     buffer: tags.image.imageBuffer,
  //     filename: tags.title + ".jpeg",
  //     folder: "moodify/posters",
  //   });
  const [songFile, posterFile] = await Promise.all([
    storageService.uploadFile({
      buffer: songBuffer,
      filename: `${tags.title}.mp3`,
      folder: "moodify/songs",
    }),

    storageService.uploadFile({
      buffer: tags.image.imageBuffer,
      filename: `${tags.title}.jpeg`,
      folder: "moodify/posters",
    }),
  ]);

  const song = await songModel.create({
    url: songFile.url,
    posterUrl: posterFile.url,
    title: tags.title,
    mood,
  });
  res.status(201).json({
    message: "Song uploaded successfully",
    song,
  });
}

async function getSongs(req, res) {
  const { mood } = req.query;
  const songs = await songModel.find({ mood });

  res.status(200).json({
    message: "Songs fetched successfully",
    songs,
  });
}

module.exports = {
  uploadSong,
  getSongs,
};
