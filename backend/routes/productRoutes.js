const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); // Import controller

// Route lấy danh sách tất cả sản phẩm
router.get('/', productController.getAllProducts);

// Route tạo sản phẩm mới
router.post('/', productController.createProduct);

// Route lấy thông tin sản phẩm theo ID
router.get('/:productId', productController.getProductById);

// Route cập nhật thông tin sản phẩm
router.put('/:productId', productController.updateProduct);

// Route xóa sản phẩm
router.delete('/:productId', productController.deleteProduct);

module.exports = router;