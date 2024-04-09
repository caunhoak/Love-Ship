// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   // Kiểm tra xem có token trong header không
//   const token = req.header("Authorization");
//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   try {
//     // Xác thực token và lấy payload (thông tin user)
//     const decoded = jwt.verify(token, "your_secret_key");
//     req.user = decoded; // Lưu thông tin user vào request để sử dụng trong các controller
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({ message: "Unauthorized" });
//   }
// };
