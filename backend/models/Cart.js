const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  store_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    required: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
