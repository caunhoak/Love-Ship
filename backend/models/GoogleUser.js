// GoogleUser.js

const mongoose = require("mongoose");

const googleUserSchema = new mongoose.Schema({
  googleId: String,
  displayName: String,
  email: String,
  // Các trường thông tin người dùng khác
});

const GoogleUser = mongoose.model("GoogleUser", googleUserSchema);
module.exports = GoogleUser;
