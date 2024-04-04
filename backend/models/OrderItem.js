const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: Number,
});

const OrderItem = mongoose.model("OrderItem", orderItemSchema);

module.exports = OrderItem;
