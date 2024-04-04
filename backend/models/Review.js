const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  target_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  rating: Number,
  comment: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
