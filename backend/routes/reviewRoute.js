const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

// Lấy tất cả đánh giá
router.get("/", reviewController.getAllReviews);

// Tạo mới đánh giá
router.post("/", reviewController.createReview);

module.exports = router;
