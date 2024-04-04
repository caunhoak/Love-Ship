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
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image_data: req.file ? req.file.buffer : null, // Lưu dữ liệu nhị phân của ảnh
    image_contentType: req.file ? req.file.mimetype : null, // Lưu loại của dữ liệu nhị phân
    description: req.body.description,
  });

  try {
    const newProduct = await product.save();
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

    product.name = req.body.name;
    product.price = req.body.price;
    if (req.file) {
      product.image_data = req.file.buffer;
      product.image_contentType = req.file.mimetype;
    }
    product.description = req.body.description;

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

    await product.remove();
    res.json({ message: "Sản phẩm đã được xóa" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
