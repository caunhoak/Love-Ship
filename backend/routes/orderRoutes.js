const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Route để lấy tất cả các đơn hàng
router.get("/", orderController.getAllOrders);

// Route để tạo mới một đơn hàng
router.post("/", orderController.createOrder);

// Route để lấy thông tin của một đơn hàng dựa trên ID
router.get("/:id", orderController.getOrderById);

// Route để xác nhận một đơn hàng
router.patch("/:id/confirm", orderController.confirmOrder);

// Route để đánh dấu đơn hàng là đang vận chuyển
router.patch("/:id/ship", orderController.shipOrder);

// Route để đánh dấu đơn hàng là đã hoàn thành
router.patch("/:id/complete", orderController.completeOrder);

// Route để hủy một đơn hàng
router.patch("/:id/cancel", orderController.cancelOrder);

module.exports = router;
