const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
});
const User = mongoose.model("User", userSchema);

console.log(User.find({ $or: [{ email: "test@test.com" }, { username: undefined }] }).getFilter());
