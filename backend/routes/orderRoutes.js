const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Route: POST api/order/create
// Description: Create a new order
router.post("/create", orderController.createOrder);

// Route: PUT api/order/updateStatus
// Description: Update order status
router.put("/updateStatus", orderController.updateOrderStatus);

// Route: GET api/order/store/:storeId
// Description: Get orders by store_id
router.get("/store/:storeId", orderController.getOrdersByStoreId);

// Route: GET api/order/user/:userId
// Description: Get orders by user_id
router.get("/user/:userId", orderController.getOrdersByUserId);

module.exports = router;
