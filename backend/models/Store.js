// Model cho cửa hàng
const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    name: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    location: String,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;