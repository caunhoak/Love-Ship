const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");

// Lấy giỏ hàng của người dùng
exports.getUserCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({ user_id: userId }).populate(
      "items.product_id"
    );
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Thêm sản phẩm vào giỏ hàng
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    let cart = await Cart.findOne({ user_id: userId });

    if (!cart) {
      cart = new Cart({ user_id: userId });
      await cart.save();
    }

    const cartItem = await CartItem.findOne({
      cart_id: cart._id,
      product_id: productId,
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      await CartItem.create({
        cart_id: cart._id,
        product_id: productId,
        quantity,
      });
    }

    res.json({ message: "Product added to cart successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa sản phẩm khỏi giỏ hàng
exports.removeFromCart = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    await CartItem.findByIdAndDelete(cartItemId);
    res.json({ message: "Product removed from cart successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
