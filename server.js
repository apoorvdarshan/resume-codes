const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("./")); // Serve static files

// PayPal Configuration
const PAYPAL_CONFIG = {
  client_id:
    "AcTFapMkTuckCRi5Goi5Ll_b2GukjvJYgVYz2ogGNlrR4JcHg6WKGl6R8JS8Rp0-leSrjUygmqNl5lAK",
  client_secret:
    "EASwVCSDOoCwi6839Eqmfz09X5toTxSDA2ovcM9ZptJAymZNdXmUNpuhZiQ9AtfnLEs0GpBMyodK6_kQ", // 🔒 Server-side secret key
  base_url: "https://api-m.paypal.com", // Use https://api-m.sandbox.paypal.com for sandbox
};

// Serve the main HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Get PayPal Access Token
async function getPayPalAccessToken() {
  try {
    const auth = Buffer.from(
      `${PAYPAL_CONFIG.client_id}:${PAYPAL_CONFIG.client_secret}`
    ).toString("base64");

    const response = await axios.post(
      `${PAYPAL_CONFIG.base_url}/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Error getting PayPal access token:", error);
    throw error;
  }
}

// Create PayPal Order
app.post("/api/create-order", async (req, res) => {
  try {
    const { amount, currency, description } = req.body;
    const accessToken = await getPayPalAccessToken();

    const orderData = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: currency || "USD",
            value: amount,
          },
          description: description || "Resume Export",
        },
      ],
    };

    const response = await axios.post(
      `${PAYPAL_CONFIG.base_url}/v2/checkout/orders`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({
      success: true,
      order_id: response.data.id,
      amount: amount,
      currency: currency || "USD",
    });
  } catch (error) {
    console.error("Error creating PayPal order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
});

// Verify PayPal Payment
app.post("/api/verify-payment", async (req, res) => {
  try {
    const { order_id } = req.body;
    const accessToken = await getPayPalAccessToken();

    const response = await axios.get(
      `${PAYPAL_CONFIG.base_url}/v2/checkout/orders/${order_id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.status === "COMPLETED") {
      res.json({
        success: true,
        message: "Payment verified successfully",
        payment: response.data,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Payment not completed",
      });
    }
  } catch (error) {
    console.error("Error verifying PayPal payment:", error);
    res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
});

// PayPal Webhook Handler
app.post("/api/webhook", async (req, res) => {
  try {
    // PayPal webhook verification would go here
    // For now, just log the webhook data
    console.log("PayPal webhook received:", req.body);

    const event = req.body.event_type;
    const resource = req.body.resource;

    console.log(`Webhook received: ${event}`);
    console.log("Payment details:", resource);

    // Handle different webhook events
    switch (event) {
      case "CHECKOUT.ORDER.COMPLETED":
        console.log(`Payment completed: ${resource.id}`);
        // Handle successful payment
        break;
      case "CHECKOUT.ORDER.CANCELLED":
        console.log(`Payment cancelled: ${resource.id}`);
        // Handle cancelled payment
        break;
      default:
        console.log(`Unhandled event: ${event}`);
    }

    res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
});

// Get Payment Details
app.get("/api/payment/:payment_id", async (req, res) => {
  try {
    const { payment_id } = req.params;
    const accessToken = await getPayPalAccessToken();

    const response = await axios.get(
      `${PAYPAL_CONFIG.base_url}/v2/checkout/orders/${payment_id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({
      success: true,
      payment: response.data,
    });
  } catch (error) {
    console.error("Error fetching PayPal payment:", error);
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
  console.log(`💳 PayPal integration: ACTIVE (Live Mode)`);
});

module.exports = app;
