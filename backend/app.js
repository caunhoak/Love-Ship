const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dbConfig = require("./config/dbConfig");

// Import các route và controllers
const authRoutes = require("./routes/authRoutes");
const storeRoutes = require("./routes/storeRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Kết nối đến cơ sở dữ liệu MongoDB
dbConfig.once("open", () => {
  console.log("MongoDB connected");
});
dbConfig.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Sử dụng middleware để xử lý các yêu cầu JSON
app.use(bodyParser.json());

// Sử dụng các route đã được định nghĩa
app.use("/api/auth", authRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);

// Xử lý lỗi cho các route không tồn tại hoặc lỗi khác
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
