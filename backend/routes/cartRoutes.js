const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Route: POST api/cart/create
// Description: Create a new cart
router.post("/create", cartController.createCart);

module.exports = router;
