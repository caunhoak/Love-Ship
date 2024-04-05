const Transaction = require("../models/Payment");

// Tạo mới một thanh toán
exports.createPayment = async (req, res) => {
  const { user_id, order_id, amount, payment_method } = req.body;

  try {
    const payment = new Payment({
      user_id,
      order_id,
      amount,
      payment_method,
      status: "Pending", // Mặc định trạng thái là "Pending"
      created_at: new Date(),
    });

    const newPayment = await payment.save();
    res.status(201).json(newPayment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Lấy tất cả các thanh toán
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy thông tin của một thanh toán dựa trên ID
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Thanh toán không tồn tại" });
    }
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Xử lý khi thanh toán thành công
exports.successPayment = async (req, res) => {
  const { paymentId } = req.params;

  try {
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: "Thanh toán không tồn tại" });
    }

    // Cập nhật trạng thái thanh toán thành "Success"
    payment.status = "Success";
    const updatedPayment = await payment.save();

    res.json(updatedPayment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Xử lý khi thanh toán thất bại
exports.failedPayment = async (req, res) => {
  const { paymentId } = req.params;

  try {
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: "Thanh toán không tồn tại" });
    }

    // Cập nhật trạng thái thanh toán thành "Failed"
    payment.status = "Failed";
    const updatedPayment = await payment.save();

    res.json(updatedPayment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
