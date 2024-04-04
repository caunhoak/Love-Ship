const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Route để lấy tất cả các đơn hàng
router.get("/", orderController.getAllOrders);

// Route để tạo đơn hàng mới
router.post("/", orderController.createOrder);

// Route để cập nhật đơn hàng
router.put("/:id", orderController.updateOrder);

// Route để xóa đơn hàng
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
