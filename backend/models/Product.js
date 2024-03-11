// Model cho sản phẩm
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    image: String,
    quantity: { type: Number, default: 0 }, // Thêm trường số lượng sản phẩm
    store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;