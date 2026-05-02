require("dotenv").config();
const app = require("./src/app");
const express = require("express");

const ConnectToDb = require("./src/config/database");

ConnectToDb();
app.listen(5000, () => {
  console.log("server start at port 5000");
});
