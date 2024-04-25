const Chat = require("../models/Chat");
const Order = require("../models/Order");

exports.createChat = async (req, res) => {
  try {
    // Get orderId from request body
    const { orderId, message } = req.body;

    // Find the order by orderId to get userId and storeId
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Extract userId and storeId from the order
    const { user_id, store_id } = order;

    // Create a new chat with extracted userId, storeId, and orderId
    const newChat = new Chat({
      user_id,
      store_id,
      order_id: orderId,
      message,
    });

    // Save the new chat
    const savedChat = await newChat.save();

    // Return the saved chat
    res.json(savedChat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.findChatByOrderId = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const chats = await Chat.find({ order_id: orderId });
    if (!chats || chats.length === 0) {
      return res.status(404).json({ message: "No chats found for this order" });
    }
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
