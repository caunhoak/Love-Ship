const CartItem = require("../models/CartItem");
const Product = require("../models/Product");

// Controller to create cart items
exports.createCartItems = async (req, res) => {
  try {
    const { cartId, items } = req.body;

    // Check if cartId and items exist in request body
    if (!cartId || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Missing required parameters or items array is empty",
      });
    }

    const cartItems = [];
    let totalPriceForAllItems = 0; // Initialize total price for all items

    // Loop through each item in the items array
    for (const item of items) {
      const { productId, quantity } = item;

      // Find the product to get its price
      const product = await Product.findById(productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${productId} not found` });
      }

      // Calculate total price based on product price and quantity
      const totalPrice = product.price * quantity;

      // Create a new CartItem
      const cartItem = await CartItem.create({
        cart_id: cartId,
        product_id: productId,
        quantity: quantity,
        total_price: totalPrice,
      });

      cartItems.push(cartItem);
      totalPriceForAllItems += totalPrice; // Add total price of current item to total price for all items
    }

    // Add totalPriceForAllItems to the response
    res.status(201).json({
      message: "Cart items created successfully",
      cartItems: cartItems,
      totalPriceForAllItems: totalPriceForAllItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to get cart items
exports.getCartItems = async (req, res) => {
  try {
    // Retrieve cart ID from request params
    const { cartId } = req.params;

    // Find all cart items associated with the given cart ID
    const cartItems = await CartItem.find({ cart_id: cartId });

    // If no cart items found, return 404
    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ message: "No cart items found" });
    }

    // Calculate total price for all items
    let totalPriceForAllItems = 0;
    for (const item of cartItems) {
      totalPriceForAllItems += item.total_price;
    }

    // If cart items found, return them in the response along with total price for all items
    res.status(200).json({
      cartItems: cartItems,
      totalPriceForAllItems: totalPriceForAllItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
