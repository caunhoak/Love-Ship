const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.get("/", paymentController.getAllPayments);
router.post("/", paymentController.createPayment);
router.get("/:id", paymentController.getPaymentById);
// Route để xác nhận thanh toán thành công
router.patch("/:paymentId/success", paymentController.successPayment);

// Route để xác nhận thanh toán thất bại
router.patch("/:paymentId/failed", paymentController.failedPayment);

module.exports = router;
