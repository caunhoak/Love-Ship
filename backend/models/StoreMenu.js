const mongoose = require("mongoose");

const storeMenuSchema = new mongoose.Schema({
  store_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

const StoreMenu = mongoose.model("StoreMenu", storeMenuSchema);

module.exports = StoreMenu;
