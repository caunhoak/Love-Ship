const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Định nghĩa các route cho xác thực người dùng
router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/reset-password", authController.requestPasswordReset);
router.post("/reset-password", authController.resetPassword);

// Route lấy danh sách tất cả người dùng
router.get("/user", authController.getAllUsers);
// Route cập nhật thông tin người dùng
router.put("/user/:userId", authController.updateUser);

module.exports = router;
