// Định nghĩa các route liên quan đến quản lý cửa hàng và sản phẩm
const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

// Định nghĩa các route cho quản lý cửa hàng và sản phẩm
router.get('/', storeController.getAllStores);
router.post('/', storeController.createStore);
router.get('/:storeId', storeController.getStoreById);
router.put('/:storeId', storeController.updateStore);
router.delete('/:storeId', storeController.deleteStore);

module.exports = router;