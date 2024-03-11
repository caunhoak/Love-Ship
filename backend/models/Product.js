// Model cho sản phẩm
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String,
    store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;