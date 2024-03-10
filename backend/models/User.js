// Model cho người dùng
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    phone: String,
    role: {
        type: String,
        enum: ["customer", "store_owner", "admin"],
        default: "customer"
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;