const StoreMenu = require("../models/StoreMenu");

// Lấy danh sách menu của cửa hàng
const getMenuByStoreId = async (req, res) => {
  try {
    const { storeId } = req.params;
    const menuItems = await StoreMenu.find({ store_id: storeId }).populate(
      "product_id"
    );
    res.json(menuItems);
  } catch (error) {
    console.error("Error in getMenuByStoreId:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Thêm sản phẩm vào menu của cửa hàng
const addMenuItem = async (req, res) => {
  try {
    const { storeId, productId } = req.params;
    const storeMenu = new StoreMenu({
      store_id: storeId,
      product_id: productId,
    });
    await storeMenu.save();
    res.status(201).json({ message: "Menu item added successfully" });
  } catch (error) {
    console.error("Error in addMenuItem:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Cập nhật sản phẩm trong menu của cửa hàng
const updateMenuItem = async (req, res) => {
  try {
    const { storeId, productId } = req.params;
    await StoreMenu.findOneAndUpdate(
      { store_id: storeId, product_id: productId },
      { $set: req.body }, // Cập nhật các trường trong body của request
      { new: true }
    );
    res.json({ message: "Menu item updated successfully" });
  } catch (error) {
    console.error("Error in updateMenuItem:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Xóa sản phẩm khỏi menu của cửa hàng
const deleteMenuItem = async (req, res) => {
  try {
    const { storeId, productId } = req.params;
    await StoreMenu.findOneAndDelete({
      store_id: storeId,
      product_id: productId,
    });
    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    console.error("Error in deleteMenuItem:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getMenuByStoreId,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
