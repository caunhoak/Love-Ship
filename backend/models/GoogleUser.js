const mongoose = require("mongoose");

const googleUserSchema = new mongoose.Schema({
  googleId: String,
  displayName: String,
  email: String,
  // Thêm các trường khác nếu cần
});

const GoogleUser = mongoose.model("GoogleUser", googleUserSchema);

module.exports = GoogleUser;
