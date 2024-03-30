const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/User");

// Function to hash the password before saving to database
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Cấu hình transporter (máy chủ gửi email)
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "votechobe1@gmail.com",
    pass: "jnqh obwx mmif mzlz",
  },
});

// Controller function to register a new user
exports.register = async (req, res) => {
  try {
    const { username, password, email, phone, role } = req.body;

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      phone,
      role,
    });

    // Save user to database
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to login a user
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Determine which screen to navigate based on user role
    let redirectScreen;
    switch (user.role) {
      case "admin":
        redirectScreen = "AdminScreen";
        break;
      case "store_owner":
        redirectScreen = "StoreScreen";
        break;
      case "customer":
        redirectScreen = "CustomerScreen";
        break;
      default:
        redirectScreen = "DefaultScreen";
        break;
    }

    // Here you can send any additional data along with the redirectScreen
    res.json({ redirectScreen });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to update user information
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updates = req.body;

    // Update user
    await User.findByIdAndUpdate(userId, updates);

    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to request password reset
exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 60000; // Expire in 1 minute
    await user.save();

    // Send reset token to user via email
    await transporter.sendMail({
      from: "votechobe1@gmail.com",
      to: email,
      subject: "Password Reset Request",
      text: `Your password reset token is: ${resetToken}`,
    });

    res.json({ message: "Reset token sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to reset password
exports.resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    // Find user by reset token
    const user = await User.findOne({ resetToken });
    if (!user || user.resetTokenExpiry < Date.now()) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    // Hash the new password
    const hashedPassword = await hashPassword(newPassword);

    // Update user's password and clear reset token
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
