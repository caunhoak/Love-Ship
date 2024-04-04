const Review = require("../models/Review");

// Lấy tất cả đánh giá
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tạo mới đánh giá
exports.createReview = async (req, res) => {
  const review = new Review({
    user_id: req.body.user_id,
    target_id: req.body.target_id,
    rating: req.body.rating,
    comment: req.body.comment,
  });

  try {
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
