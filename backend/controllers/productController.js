const Product = require("../models/Product");

// Hiển thị tất cả sản phẩm
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Hiển thị thông tin của một sản phẩm cụ thể
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo mới một sản phẩm
exports.createProduct = async (req, res) => {
  const { name, price, description, delivery_time, completion_time, store_id } =
    req.body;
  const image_data = req.file ? req.file.buffer : null;
  const image_contentType = req.file ? req.file.mimetype : null;

  try {
    const newProduct = await Product.create({
      name,
      price,
      description,
      delivery_time,
      completion_time,
      image_data,
      image_contentType,
      store_id, // Thêm store_id vào dữ liệu sản phẩm mới
    });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Cập nhật thông tin của một sản phẩm
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    const {
      name,
      price,
      description,
      delivery_time,
      completion_time,
      store_id,
    } = req.body;
    if (name) product.name = name;
    if (price) product.price = price;
    if (description) product.description = description;
    if (delivery_time) product.delivery_time = delivery_time;
    if (completion_time) product.completion_time = completion_time;
    if (store_id) product.store_id = store_id; // Cập nhật store_id nếu được cung cấp
    if (req.file) {
      product.image_data = req.file.buffer;
      product.image_contentType = req.file.mimetype;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Xóa một sản phẩm
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    await product.deleteOne();
    res.json({ message: "Sản phẩm đã được xóa" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy dữ liệu ảnh của sản phẩm từ MongoDB
exports.getProductImage = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || !product.image_data) {
      return res.status(404).json({ message: "Không tìm thấy ảnh sản phẩm" });
    }
    res.set("Content-Type", product.image_contentType);
    res.send(product.image_data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
