// Định nghĩa các route liên quan đến quản lý đơn hàng
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Định nghĩa các route cho quản lý đơn hàng
router.get('/', orderController.getAllOrders);
router.post('/', orderController.createOrder);
router.get('/:orderId', orderController.getOrderById);
router.put('/:orderId', orderController.updateOrder);
router.delete('/:orderId', orderController.deleteOrder);

module.exports = router;