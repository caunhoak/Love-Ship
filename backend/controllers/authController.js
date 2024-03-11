// Controller xử lý logic liên quan đến xác thực người dùng
const User = require('../models/User');

// Xử lý đăng nhập
exports.login = async (req, res) => {
    try {
        // Thực hiện xác thực người dùng, ví dụ: sử dụng email và mật khẩu
        const { email, password } = req.body;
        
        // Kiểm tra xem người dùng có tồn tại không
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại." });
        }
        
        // Kiểm tra mật khẩu
        if (user.password !== password) {
            return res.status(401).json({ message: "Mật khẩu không chính xác." });
        }
        
        // Đăng nhập thành công
        res.status(200).json({ message: "Đăng nhập thành công." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xử lý đăng ký
exports.register = async (req, res) => {
    try {
        // Tạo một người dùng mới từ dữ liệu đăng ký
        const newUser = new User(req.body);
        await newUser.save();

        // Đăng ký thành công
        res.status(201).json({ message: "Đăng ký thành công." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy danh sách tất cả người dùng
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật thông tin người dùng
exports.updateUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.userId, req.body);
        res.status(200).json({ message: "Thông tin người dùng đã được cập nhật." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};