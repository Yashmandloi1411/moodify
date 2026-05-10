const express = require("express");
const cookieParser = require("cookie-parser");

// path
const path = require("path");

const authRoutes = require("../src/routes/auth.routes");
const songRoutes = require("../src/routes/song.routes");
const { handleError } = require("./middlewares/error.middleware");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // frontend urls
    credentials: true,
  }),
);

// serve frontend build
app.use(express.static(path.join(__dirname, "../dist")));

app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);

// react routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// error handling middleware at last
app.use(handleError);
module.exports = app;
