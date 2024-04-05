const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image_data: Buffer, // Dữ liệu nhị phân của ảnh
  image_contentType: String, // Loại của dữ liệu nhị phân (ví dụ: 'image/png', 'image/jpeg')
  description: String,
  delivery_time: String, // Thời gian giao hàng
  completion_time: String, // Thời gian hoàn thành
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
