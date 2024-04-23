const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

// Route to save message to database
router.post("/message", async (req, res) => {
  try {
    const { sender_id, receiver_id, message } = req.body;
    const savedMessage = await chatController.saveMessage(
      sender_id,
      receiver_id,
      message
    );
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add more routes as needed...

module.exports = router;
