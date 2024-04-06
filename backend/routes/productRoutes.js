const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const upload = require("../middlewares/fileUploadMiddleware");

// Lấy tất cả sản phẩm
router.get("/", productController.getAllProducts);

// Lấy thông tin của một sản phẩm theo ID
router.get("/:id", productController.getProductById);

// Tạo mới một sản phẩm với hỗ trợ tải ảnh
router.post("/", upload.single("image"), productController.createProduct);

// Cập nhật thông tin của một sản phẩm
router.put("/:id", upload.single("image"), productController.updateProduct);

// Xóa một sản phẩm
router.delete("/:id", productController.deleteProduct);

// Lấy dữ liệu ảnh của sản phẩm
router.get("/:id/image", productController.getProductImage);

module.exports = router;
