const Store = require("../models/Store");

// Controller để lấy tất cả cửa hàng
exports.getAllStores = async (req, res) => {
  try {
    const stores = await Store.find();
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller để lấy thông tin của một cửa hàng theo ID
exports.getStoreById = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }
    res.json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createStore = async (req, res) => {
  const store = new Store({
    name: req.body.name,
    owner_id: req.body.owner_id,
    address: req.body.address,
    phone: req.body.phone,
  });

  try {
    if (req.file) {
      store.logo_data = req.file.buffer;
      store.logo_contentType = req.file.mimetype;
    }

    const newStore = await store.save();
    const storeId = newStore._id; // Lấy _id của cửa hàng mới tạo

    console.log("StoreId created:", storeId); // Log _id của cửa hàng mới tạo
    res.status(201).json(newStore);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateStore = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    // Cập nhật thông tin cửa hàng
    store.name = req.body.name || store.name;
    store.address = req.body.address || store.address;
    store.phone = req.body.phone || store.phone;

    if (req.file) {
      store.logo_data = req.file.buffer;
      store.logo_contentType = req.file.mimetype;
    }

    const updatedStore = await store.save();
    res.json(updatedStore);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller để xóa một cửa hàng
exports.deleteStore = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    console.log("deleting store: ", store.name);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    await Store.deleteOne({ _id: req.params.id });
    res.json({ message: "Store deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStoreImage = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);

    if (!store || !store.logo_data) {
      return res.status(404).json({ message: "Store or image not found" });
    }

    res.set("Content-Type", store.logo_contentType);
    res.send(store.logo_data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
