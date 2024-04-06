const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");
const upload = require("../middlewares/fileUploadMiddleware");

// Định nghĩa các route cho các phương thức CRUD

// Lấy tất cả cửa hàng
router.get("/", storeController.getAllStores);

// Lấy thông tin của một cửa hàng theo ID
router.get("/:id", storeController.getStoreById);

// Tạo một cửa hàng mới với hỗ trợ tải ảnh
router.post("/", upload.single("logo"), storeController.createStore);

// Cập nhật thông tin của một cửa hàng
router.put("/:id", upload.single("logo"), storeController.updateStore);

// Xóa một cửa hàng
router.delete("/:id", storeController.deleteStore);

// Route để lấy ảnh của cửa hàng
router.get("/:id/image", storeController.getStoreImage);

module.exports = router;
