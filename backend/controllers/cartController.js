const Cart = require("../models/Cart");

// Controller to create a new cart
exports.createCart = async (req, res) => {
  try {
    const { userId, storeId } = req.body;
    // Check if userId and storeId exist in request body
    if (!userId || !storeId) {
      return res.status(400).json({
        message: "Missing required parameters: userId or storeId",
      });
    }

    // Create a new cart with userId and storeId
    const cart = await Cart.create({ user_id: userId, store_id: storeId });

    res.status(201).json({ message: "Cart created successfully", cart: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
