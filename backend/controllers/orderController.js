// Controller xử lý logic liên quan đến quản lý đơn hàng
const Order = require('../models/Order');

// Lấy danh sách tất cả đơn hàng
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tạo đơn hàng mới
exports.createOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json({ message: "Đơn hàng mới đã được tạo." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy thông tin đơn hàng theo ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật thông tin đơn hàng
exports.updateOrder = async (req, res) => {
    try {
        await Order.findByIdAndUpdate(req.params.orderId, req.body);
        res.status(200).json({ message: "Thông tin đơn hàng đã được cập nhật." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa đơn hàng
exports.deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.orderId);
        res.status(200).json({ message: "Đơn hàng đã được xóa." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};