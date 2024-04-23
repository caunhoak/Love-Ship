const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

// Route: POST api/payment/createPaypalPayment
// Description: Create a PayPal payment
router.post("/createPaypalPayment", paymentController.createPaypalPayment);

// Route: GET api/payment/executePaypalPayment
// Description: Execute a PayPal payment
router.get("/executePaypalPayment", paymentController.executePaypalPayment);

module.exports = router;
