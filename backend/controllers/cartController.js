const Cart = require("../models/Cart");

// Controller to create a new cart
exports.createCart = async (req, res) => {
  try {
    const { userId } = req.body;
    // Check if userId exists in request body
    if (!userId) {
      return res
        .status(400)
        .json({ message: "Missing required parameter: userId" });
    }

    // Create a new cart with userId
    const cart = await Cart.create({ user_id: userId });

    res.status(201).json({ message: "Cart created successfully", cart: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

  // try {
  //   const { userId } = req.body;
  //   // Check if userId exists in request body
  //   if (!userId) {
  //     return res
  //       .status(400)
  //       .json({ message: "Missing required parameter: userId" });
  //   }

  //   // Try to find an existing cart for the user
  //   let cart = await Cart.findOne({ user_id: userId });

  //   // If no cart found, create a new one
  //   if (!cart) {
  //     cart = await Cart.create({ user_id: userId });
  //     return res.status(201).json({
  //       message: "Cart created successfully",
  //       cart: cart,
  //     });
  //   }

  //   // If cart found, return it
  //   res.status(200).json({
  //     message: "Existing cart retrieved successfully",
  //     cart: cart,
  //   });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: "Internal server error" });
  // }
};
