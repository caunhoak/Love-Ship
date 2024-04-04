const CartItem = require("../models/CartItem");
const Product = require("../models/Product");

// Controller để tạo một cart item mới
exports.createCartItem = async (req, res) => {
  try {
    const { cart_id, product_id, quantity } = req.body;

    // Kiểm tra xem cart_id và product_id có tồn tại không
    const cartExists = await Cart.exists({ _id: cart_id });
    const productExists = await Product.exists({ _id: product_id });

    if (!cartExists) {
      return res.status(404).json({ success: false, error: "Cart not found" });
    }

    if (!productExists) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    // Tiếp tục tạo cart item nếu cả hai id đều hợp lệ
    const newCartItem = new CartItem({
      cart_id,
      product_id,
      quantity,
    });

    await newCartItem.save();

    res.status(201).json({ success: true, data: newCartItem });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller để lấy tất cả các cart items
exports.getAllCartItems = async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    res.status(200).json({ success: true, data: cartItems });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller để lấy một cart item bằng id
exports.getCartItemById = async (req, res) => {
  try {
    const cartItem = await CartItem.findById(req.params.id);
    if (!cartItem) {
      return res
        .status(404)
        .json({ success: false, error: "CartItem not found" });
    }
    res.status(200).json({ success: true, data: cartItem });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller để cập nhật thông tin của một cart item
exports.updateCartItem = async (req, res) => {
  try {
    const cartItem = await CartItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!cartItem) {
      return res
        .status(404)
        .json({ success: false, error: "CartItem not found" });
    }
    res.status(200).json({ success: true, data: cartItem });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller để xóa một cart item
exports.deleteCartItem = async (req, res) => {
  try {
    const cartItem = await CartItem.findByIdAndDelete(req.params.id);
    if (!cartItem) {
      return res
        .status(404)
        .json({ success: false, error: "CartItem not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
