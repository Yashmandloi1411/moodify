require("dotenv").config();
const app = require("./src/app");
const express = require("express");

const ConnectToDb = require("./src/config/database");

ConnectToDb();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server start at port ${PORT}`);
});
