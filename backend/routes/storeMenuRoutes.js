const express = require("express");
const router = express.Router();
const storeMenuController = require("../controllers/storeMenuController");

// Lấy danh sách menu của cửa hàng
router.get("/:storeId", storeMenuController.getMenuByStoreId);

// Thêm sản phẩm vào menu của cửa hàng
router.post("/:storeId/add/:productId", storeMenuController.addMenuItem);

// Cập nhật sản phẩm trong menu của cửa hàng
router.put("/:storeId/update/:productId", storeMenuController.updateMenuItem);

// Xóa sản phẩm khỏi menu của cửa hàng
router.delete(
  "/:storeId/delete/:productId",
  storeMenuController.deleteMenuItem
);

module.exports = router;
