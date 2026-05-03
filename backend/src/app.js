const express = require("express");
const cookieParser = require("cookie-parser");

const authRoutes = require("../src/routes/auth.routes");
const songRoutes = require("../src/routes/song.routes");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // frontend url
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);

module.exports = app;
