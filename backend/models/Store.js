// const mongoose = require("mongoose");

// const storeSchema = new mongoose.Schema({
//   name: String,
//   owner_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
//   address: String,
//   phone: String,
//   logo_data: Buffer, // Lưu trữ dữ liệu nhị phân của ảnh
//   logo_contentType: String, // Loại của dữ liệu nhị phân (ví dụ: 'image/png', 'image/jpeg')
// });

// const Store = mongoose.model("Store", storeSchema);

// module.exports = Store;

const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  name: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  address: String,
  phone: String,
  logo_data: Buffer, // Lưu trữ dữ liệu nhị phân của ảnh
  logo_contentType: String, // Loại của dữ liệu nhị phân (ví dụ: 'image/png', 'image/jpeg')
});

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
