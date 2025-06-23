const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("./")); // Serve static files

// Razorpay Configuration with Secret Key
const razorpay = new Razorpay({
  key_id: "rzp_live_McNKjjPIAKglzo",
  key_secret: "r09anvr5bqRnC6iKt0Ywm2GE", // 🔒 Server-side secret key
});

// Serve the main HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Create Razorpay Order (Optional - for better security)
app.post("/api/create-order", async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;

    const options = {
      amount: amount, // amount in paise
      currency: currency || "INR",
      receipt: receipt || `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
});

// Verify Payment Signature
app.post("/api/verify-payment", (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // Create verification signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", "r09anvr5bqRnC6iKt0Ywm2GE")
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      res.json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
});

// Razorpay Webhook Handler
app.post("/api/webhook", (req, res) => {
  try {
    const secret = "your_webhook_secret"; // Set this in Razorpay dashboard
    const signature = req.headers["x-razorpay-signature"];

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (signature === expectedSignature) {
      const event = req.body.event;
      const payment = req.body.payload.payment.entity;

      console.log(`Webhook received: ${event}`);
      console.log("Payment details:", payment);

      // Handle different webhook events
      switch (event) {
        case "payment.captured":
          console.log(`Payment captured: ${payment.id}`);
          // Handle successful payment
          break;
        case "payment.failed":
          console.log(`Payment failed: ${payment.id}`);
          // Handle failed payment
          break;
        default:
          console.log(`Unhandled event: ${event}`);
      }

      res.status(200).json({ status: "ok" });
    } else {
      res.status(400).json({ error: "Invalid signature" });
    }
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
});

// Get Payment Details
app.get("/api/payment/:payment_id", async (req, res) => {
  try {
    const { payment_id } = req.params;
    const payment = await razorpay.payments.fetch(payment_id);

    res.json({
      success: true,
      payment: payment,
    });
  } catch (error) {
    console.error("Error fetching payment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch payment details",
    });
  }
});

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "Resume.codes Payment Server",
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Server error:", error);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Access your app at: http://localhost:${PORT}`);
  console.log(`💳 Razorpay integration: ACTIVE (Live Mode)`);
});

module.exports = app;
