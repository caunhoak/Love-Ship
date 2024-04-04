const multer = require("multer");

// Thiết lập Multer để xử lý tệp ảnh
const storage = multer.memoryStorage();

// Kiểm tra loại file
function fileFilter(req, file, cb) {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
