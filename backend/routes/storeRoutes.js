const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");
const upload = require("../middlewares/fileUploadMiddleware"); // Giữ nguyên middleware tải tệp nếu cần

// Lấy tất cả cửa hàng
router.get("/", storeController.getAllStores);

// Lấy thông tin của một cửa hàng theo ID
router.get("/:id", storeController.getStoreById);

// Đăng ký cửa hàng
router.post("/", upload.single("logo"), storeController.createStore);

// Cập nhật thông tin của một cửa hàng
router.put("/:id", upload.single("logo"), storeController.updateStore);

// Xóa một cửa hàng
router.delete("/:id", storeController.deleteStore);

// Route để lấy ảnh của cửa hàng
router.get("/:id/image", storeController.getStoreImage);

module.exports = router;
