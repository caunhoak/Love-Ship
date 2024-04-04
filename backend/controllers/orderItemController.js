const OrderItem = require("../models/OrderItem");

// Controller để tạo mới một order item
exports.createOrderItem = async (req, res) => {
  try {
    const { order_id, product_id, quantity } = req.body;
    const orderItem = new OrderItem({ order_id, product_id, quantity });
    await orderItem.save();
    res.status(201).json(orderItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller để lấy danh sách các order item
exports.getOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem.find();
    res.json(orderItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller để lấy chi tiết của một order item
exports.getOrderItemById = async (req, res) => {
  try {
    const orderItem = await OrderItem.findById(req.params.id);
    if (!orderItem) {
      return res.status(404).json({ error: "Order item not found" });
    }
    res.json(orderItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller để cập nhật thông tin của một order item
exports.updateOrderItem = async (req, res) => {
  try {
    const { order_id, product_id, quantity } = req.body;
    const orderItem = await OrderItem.findByIdAndUpdate(
      req.params.id,
      { order_id, product_id, quantity },
      { new: true }
    );
    if (!orderItem) {
      return res.status(404).json({ error: "Order item not found" });
    }
    res.json(orderItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller để xóa một order item
exports.deleteOrderItem = async (req, res) => {
  try {
    const orderItem = await OrderItem.findByIdAndDelete(req.params.id);
    if (!orderItem) {
      return res.status(404).json({ error: "Order item not found" });
    }
    res.json({ message: "Order item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
