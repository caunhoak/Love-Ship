const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

// Route to create a new transaction
router.post("/", transactionController.createTransaction);

// Route to get all transactions
router.get("/", transactionController.getAllTransactions);

// Route to get a transaction by ID
router.get("/:id", transactionController.getTransactionById);

module.exports = router;
