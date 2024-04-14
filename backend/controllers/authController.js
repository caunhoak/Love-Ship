const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const Store = require("../models/Store");

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
      return res.json({ message: "User not found" });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.json({ message: "Invalid password" });
    }

    let redirectScreen, extraData;

    switch (user.role) {
      case "admin":
        redirectScreen = "AdminScreen";
        extraData = { userId: user._id };
        break;
      case "store_owner":
        // Find store by owner_id
        const store = await Store.findOne({ owner_id: user._id });
        if (store) {
          redirectScreen = "ManagementStore";
          extraData = { userId: user._id, storeId: store._id }; // Assign storeId if store is found
        } else {
          redirectScreen = "RegisterStoreScreen";
          extraData = { userId: user._id }; // No store found, don't assign storeId
        }
        break;
      case "customer":
        redirectScreen = "CustomerScreen";
        extraData = { userId: user._id };
        break;
      default:
        redirectScreen = "DefaultScreen";
        extraData = { userId: user._id };
        break;
    }

    // Return userId và extraData cho màn hình tiếp theo
    res.json({ redirectScreen, ...extraData });
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

// Controller function to get user by ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to update user information
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.userId; // Đổi từ req.params.id thành req.params.userId
    const updates = req.body;
    const { email, username } = req.body;

    // Check if the email being updated already exists
    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== userId) {
        // Sử dụng userId ở đây
        return res.status(400).json({
          status: "fail",
          message: "Email already exists. Please use a different email.",
        });
      }
    }

    // Ensure username cannot be updated
    if (username) {
      return res.status(400).json({
        status: "fail",
        message: "Username cannot be updated.",
      });
    }

    // Update user
    await User.findByIdAndUpdate(userId, updates);

    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to delete a user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Attempt to find and delete the user
    const deletedUser = await User.findByIdAndDelete(userId);

    // If no user found with the given ID, return an error
    if (!deletedUser) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    // If user is successfully deleted, return success message
    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    // If an error occurs during deletion, return internal server error
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
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

    // // Generate reset token
    const resetToken = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 180000; // Expire in 3 minute
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
