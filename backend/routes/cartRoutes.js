const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Đường dẫn cho các hoạt động liên quan đến giỏ hàng
router.get("/cart/:userId", cartController.getUserCart); // Lấy giỏ hàng của người dùng
router.post("/cart/add", cartController.addToCart); // Thêm sản phẩm vào giỏ hàng
router.delete("/cart/:cartItemId", cartController.removeFromCart); // Xóa sản phẩm khỏi giỏ hàng

module.exports = router;
