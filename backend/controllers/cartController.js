const Cart = require("../models/Cart");

// Controller to create a new cart
exports.createCart = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log(userId);

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
};

// // Controller to create a new cart
// exports.createCart = async (req, res) => {
//   try {
//     const { userId } = req.body;

//     // Check if userId exists in request body
//     if (!userId) {
//       return res
//         .status(400)
//         .json({ message: "Missing required parameter: userId" });
//     }

//     // Create a new cart
//     const cart = await Cart.create({ user_id: userId });

//     res.status(201).json({ message: "Cart created successfully", cart: cart });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
