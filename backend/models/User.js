// Model cho người dùng
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  phone: String,
  role: {
    type: String,
    enum: ["customer", "store_owner", "admin"],
    default: "customer",
  },
  resetToken: String, // Thêm trường resetToken
  resetTokenExpiry: Date, // Thêm trường resetTokenExpiry tạo thời hạn hết hạn cho mã token
});

const User = mongoose.model("User", userSchema);

module.exports = User;
