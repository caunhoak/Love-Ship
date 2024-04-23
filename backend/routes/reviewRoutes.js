const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

// Route để tạo mới một đánh giá
router.post("/reviews", reviewController.createReview);

// Route để lấy tất cả các đánh giá
router.get("/reviews", reviewController.getAllReviews);

// Route để lấy một đánh giá bằng ID
router.get("/reviews/:id", reviewController.getReviewById);

// Route để cập nhật một đánh giá
router.put("/reviews/:id", reviewController.updateReview);

// Route để xóa một đánh giá
router.delete("/reviews/:id", reviewController.deleteReview);

module.exports = router;
