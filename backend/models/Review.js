const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // Chuyển target_id thành store_id để đại diện cho cửa hàng được đánh giá
  store_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  rating: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    default: "none", // Thiết lập giá trị mặc định là "none" thay vì bắt buộc người dùng phải đánh giá
  },
  comment: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
