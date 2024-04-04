const express = require("express");
const router = express.Router();
const orderItemController = require("../controllers/orderItemController");

// Định nghĩa các route cho OrderItem

// Tạo một order item mới
router.post("/", orderItemController.createOrderItem);

// Lấy danh sách các order item
router.get("/", orderItemController.getOrderItems);

// Lấy chi tiết của một order item dựa trên ID
router.get("/:id", orderItemController.getOrderItemById);

// Cập nhật thông tin của một order item dựa trên ID
router.put("/:id", orderItemController.updateOrderItem);

// Xóa một order item dựa trên ID
router.delete("/:id", orderItemController.deleteOrderItem);

module.exports = router;
