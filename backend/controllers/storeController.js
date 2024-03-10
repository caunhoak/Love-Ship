// Controller xử lý logic liên quan đến quản lý cửa hàng và sản phẩm
const Store = require('../models/Store');

// Lấy danh sách tất cả cửa hàng
exports.getAllStores = async (req, res) => {
    try {
        const stores = await Store.find();
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tạo cửa hàng mới
exports.createStore = async (req, res) => {
    try {
        const newStore = new Store(req.body);
        await newStore.save();
        res.status(201).json({ message: "Cửa hàng mới đã được tạo." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy thông tin cửa hàng theo ID
exports.getStoreById = async (req, res) => {
    try {
        const store = await Store.findById(req.params.storeId);
        res.status(200).json(store);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật thông tin cửa hàng
exports.updateStore = async (req, res) => {
    try {
        await Store.findByIdAndUpdate(req.params.storeId, req.body);
        res.status(200).json({ message: "Thông tin cửa hàng đã được cập nhật." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa cửa hàng
exports.deleteStore = async (req, res) => {
    try {
        await Store.findByIdAndDelete(req.params.storeId);
        res.status(200).json({ message: "Cửa hàng đã được xóa." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};