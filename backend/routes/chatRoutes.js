// routes/chatRoutes.js

const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

// /api/chat/create
router.post("/create", chatController.createChat);
// /api/chat/order/:orderId
router.get("/order/:orderId", chatController.findChatByOrderId);

module.exports = router;
