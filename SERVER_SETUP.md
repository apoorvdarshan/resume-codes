# 🚀 Resume.codes Server Setup

## Overview

This server-side component handles secure PayPal payment processing with the client_secret.

## 🔧 Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Server

```bash
# Production
npm start

# Development (with auto-restart)
npm run dev
```

### 3. Access Your App

- **Local**: http://localhost:3000
- **Your resume builder will now run through the server**

## 🔒 Security Features

### Server-side Key Management

- ✅ **Client Secret**: `EASwVCSDOoCwi6839Eqmfz09X5toTxSDA2ovcM9ZptJAymZNdXmUNpuhZiQ9AtfnLEs0GpBMyodK6_kQ` (Live)
- ✅ **Secure Storage**: Never exposed to frontend
- ✅ **Payment Verification**: Server-side order validation

## 📡 API Endpoints

### Payment APIs

- `POST /api/create-order` - Create PayPal order
- `POST /api/verify-payment` - Verify payment completion
- `GET /api/payment/:id` - Get payment details
- `POST /api/webhook` - Handle PayPal webhooks

### Utility APIs

- `GET /api/health` - Server health check
- `GET /` - Serve the resume builder app

## 🧪 Testing Payment Flow

### 1. Test PayPal Account

- **Sandbox**: Use PayPal sandbox credentials
- **Live**: Use real PayPal account
- **Testing**: PayPal provides test buyer accounts

### 2. Webhook Testing

Configure webhook URL in PayPal developer dashboard:

```
http://your-domain.com/api/webhook
```

## 🌐 Deployment Options

### Option 1: Local Development

```bash
npm start
# Access: http://localhost:3000
```

### Option 2: Heroku

```bash
# Install Heroku CLI
heroku create your-app-name
git push heroku main
```

### Option 3: Vercel

```bash
# Install Vercel CLI
vercel
```

### Option 4: Railway

```bash
# Connect your GitHub repo to Railway
# Auto-deploys on git push
```

## 🔧 Environment Variables (Optional)

Create `.env` file for production:

```env
PORT=3000
PAYPAL_CLIENT_ID=AcTFapMkTuckCRi5Goi5Ll_b2GukjvJYgVYz2ogGNlrR4JcHg6WKGl6R8JS8Rp0-leSrjUygmqNl5lAK
PAYPAL_CLIENT_SECRET=EASwVCSDOoCwi6839Eqmfz09X5toTxSDA2ovcM9ZptJAymZNdXmUNpuhZiQ9AtfnLEs0GpBMyodK6_kQ
WEBHOOK_SECRET=your_webhook_secret
NODE_ENV=production
```

## 📊 Features Included

### ✅ Payment Processing

- Order creation
- Payment verification
- Webhook handling
- OAuth token management

### ✅ Security

- CORS enabled
- Input validation
- Error handling
- Secure key storage

### ✅ Development Tools

- Hot reload with nodemon
- Comprehensive logging
- Health check endpoint
- Static file serving

## 🚨 Important Notes

1. **Key Security**: Never commit real keys to version control
2. **HTTPS Required**: Use HTTPS in production for webhooks
3. **Webhook Secret**: Set webhook secret in PayPal developer dashboard
4. **Error Handling**: All APIs include proper error responses

## 🔄 Migration from Razorpay to PayPal

Your resume builder now uses PayPal for payment processing, providing:

- ✅ Secure payment processing
- ✅ Webhook handling
- ✅ Better error management
- ✅ Production-ready architecture

The frontend code has been updated to use PayPal's JavaScript SDK with modal-based payment flow!
