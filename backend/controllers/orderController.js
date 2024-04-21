const Order = require("../models/Order");
const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");

// Controller to create a new order
exports.createOrder = async (req, res) => {
  try {
    const { cartId, userId } = req.body;
    // Check if required parameters exist
    if (!cartId || !userId) {
      return res.status(400).json({
        message: "Missing required parameters",
      });
    }

    // Find the cart by ID to get the store ID
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find all cart items associated with the given cart ID
    const cartItems = await CartItem.find({ cart_id: cartId });

    // Calculate total price for all items
    let totalPriceForAllItems = 0;
    for (const item of cartItems) {
      totalPriceForAllItems += item.total_price;
    }

    // Create a new order with store_id from the cart and total_price from cartItems
    const order = await Order.create({
      cart_id: cartId,
      store_id: cart.store_id,
      user_id: userId,
      total_price: totalPriceForAllItems,
    });

    res
      .status(201)
      .json({ message: "Order created successfully", order: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to update the status of an order
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    // Check if orderId and status exist in request body
    if (!orderId || !status) {
      return res.status(400).json({
        message: "Missing required parameters",
      });
    }

    // Find the order by ID and update its status
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res
      .status(200)
      .json({
        message: "Order status updated successfully",
        order: updatedOrder,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to view orders by store_id
exports.getOrdersByStoreId = async (req, res) => {
  try {
    const { storeId } = req.params;
    // Find all orders associated with the given store ID
    const orders = await Order.find({ store_id: storeId });

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this store" });
    }

    res.status(200).json({ orders: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to view orders by user_id
exports.getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    // Find all orders associated with the given user ID
    const orders = await Order.find({ user_id: userId });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json({ orders: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
