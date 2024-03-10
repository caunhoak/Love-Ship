const Product = require('../models/Product'); // Import model

// Lấy danh sách tất cả sản phẩm
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tạo sản phẩm mới
exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json({ message: "Sản phẩm mới đã được tạo." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy thông tin sản phẩm theo ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật thông tin sản phẩm
exports.updateProduct = async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.productId, req.body);
        res.status(200).json({ message: "Thông tin sản phẩm đã được cập nhật." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.productId);
        res.status(200).json({ message: "Sản phẩm đã được xóa." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};