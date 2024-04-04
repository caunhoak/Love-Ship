const Transaction = require("../models/Transaction");

// Controller function to create a new transaction
exports.createTransaction = async (req, res) => {
  try {
    const { user_id, store_id, amount, payment_method } = req.body;

    // Create a new transaction
    const transaction = new Transaction({
      user_id,
      store_id,
      amount,
      payment_method,
    });

    // Save the transaction to the database
    await transaction.save();

    res.status(201).json({ success: true, transaction });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller function to get all transactions
exports.getAllTransactions = async (req, res) => {
  try {
    // Retrieve all transactions from the database
    const transactions = await Transaction.find();

    res.status(200).json({ success: true, transactions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller function to get a transaction by ID
exports.getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;

    // Retrieve the transaction by ID from the database
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found" });
    }

    res.status(200).json({ success: true, transaction });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
