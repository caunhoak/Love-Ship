const express = require("express");
const router = express.Router();
const cartItemController = require("../controllers/cartItemController");

// Route: POST /cartItem/createItems
// Description: Create multiple new cart items
router.post("/createItems", cartItemController.createCartItems);

module.exports = router;
