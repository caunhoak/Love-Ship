const Payment = require("../models/Payment");
const Order = require("../models/Order");
const paypal = require("paypal-rest-sdk");

// Configure PayPal
paypal.configure({
  mode: "sandbox", // sandbox or live
  client_id:
    "ATrF7HSNuSyCMNblW2m0Zc2PJb3anBAcIDBkrI_6NG8Q3nPGGItE9z-HZTpYkQBB79TpQvn0IiB-zqVF",
  client_secret:
    "EMdGGhmpqRbVw6GE2Y5aVmm-QcuRIKewl0SBX54I13gdVxVSNkFg2b20B0q10U70Rygb9fncw-OPLfsi",
});

// Controller to create a PayPal payment
exports.createPaypalPayment = async (req, res) => {
  try {
    const { orderId, userId } = req.body;

    // Find the order by ID to get the total price
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const amount = order.total_price;
    const description = "Payment for order #" + orderId;

    // Save the payment details in the database
    const newPayment = new Payment({
      order_id: orderId,
      user_id: userId,
      amount: amount,
      status: "pending", // Payment status initially set to pending
      payment_method: "PayPal",
    });
    await newPayment.save();

    // Create a PayPal payment
    const paypalPayment = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://192.168.1.39:3000/api/payment/success",
        cancel_url: "http://192.168.1.39:3000/api/payment/failed",
      },
      transactions: [
        {
          amount: {
            total: amount.toFixed(2),
            currency: "USD",
          },
          description: description,
        },
      ],
    };

    // Send the request to PayPal
    const payment = await new Promise((resolve, reject) => {
      paypal.payment.create(paypalPayment, (error, payment) => {
        if (error) {
          reject(error);
        } else {
          resolve(payment);
        }
      });
    });

    // Update the payment with PayPal ID
    newPayment.paypal_payment_id = payment.id;
    await newPayment.save();

    // Redirect the user to PayPal approval_url
    const approvalUrl = payment.links.find(
      (link) => link.rel === "approval_url"
    ).href;
    res.json({ approvalUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to handle PayPal payment execution
exports.executePaypalPayment = async (req, res) => {
  try {
    const { paymentId, PayerID } = req.query;

    paypal.payment.execute(
      paymentId,
      { payer_id: PayerID },
      async (error, payment) => {
        if (error) {
          console.error(error);
          return res.redirect("http://192.168.1.39:3000/api/payment/failed");
        } else {
          // Update payment status in the database
          await Payment.findOneAndUpdate(
            { paypal_payment_id: paymentId },
            { status: "success" }
          );

          // Redirect the user to a success page
          res.redirect("http://192.168.1.39:3000/api/payment/success");
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
