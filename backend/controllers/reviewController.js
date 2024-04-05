const Review = require("../models/Review");

// Controller để tạo mới một đánh giá
exports.createReview = async (req, res) => {
  try {
    const { user_id, store_id, rating, comment } = req.body;

    // Lấy ngày và giờ hiện tại
    const currentDate = new Date();

    // Tạo một đánh giá mới với ngày và giờ hiện tại
    const newReview = new Review({
      user_id,
      store_id,
      rating,
      comment,
      created_at: currentDate,
    });

    // Lưu đánh giá vào cơ sở dữ liệu
    const savedReview = await newReview.save();

    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller để cập nhật một đánh giá
exports.updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Không tìm thấy đánh giá" });
    }

    // Cập nhật thông tin đánh giá
    review.rating = rating;
    review.comment = comment;
    review.created_at = new Date(); // Cập nhật created_at với ngày và giờ hiện tại

    // Lưu thay đổi vào cơ sở dữ liệu
    const updatedReview = await review.save();
    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller để lấy tất cả các đánh giá
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller để lấy một đánh giá bằng ID
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Không tìm thấy đánh giá" });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller để xóa một đánh giá
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Không tìm thấy đánh giá" });
    }

    // Xóa đánh giá khỏi cơ sở dữ liệu
    await review.remove();
    res.json({ message: "Đánh giá đã được xóa" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
