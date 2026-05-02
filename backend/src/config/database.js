const mongoose = require("mongoose");
const ConnectToDb = async () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("connect to db");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = ConnectToDb;
