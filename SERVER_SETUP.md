# 🚀 Resume.codes Server Setup

## Overview

This server-side component handles secure Razorpay payment processing with the key_secret.

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

- ✅ **Key Secret**: `r09anvr5bqRnC6iKt0Ywm2GE` (Live)
- ✅ **Secure Storage**: Never exposed to frontend
- ✅ **Payment Verification**: Server-side signature validation

## 📡 API Endpoints

### Payment APIs

- `POST /api/create-order` - Create Razorpay order
- `POST /api/verify-payment` - Verify payment signature
- `GET /api/payment/:id` - Get payment details
- `POST /api/webhook` - Handle Razorpay webhooks

### Utility APIs

- `GET /api/health` - Server health check
- `GET /` - Serve the resume builder app

## 🧪 Testing Payment Flow

### 1. Test Cards

- **Success**: `4111 1111 1111 1111`
- **Failure**: `4000 0000 0000 0002`
- **CVV**: `123` | **Expiry**: `12/25`

### 2. Webhook Testing

Configure webhook URL in Razorpay dashboard:

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
RAZORPAY_KEY_ID=rzp_live_McNKjjPIAKglzo
RAZORPAY_KEY_SECRET=r09anvr5bqRnC6iKt0Ywm2GE
WEBHOOK_SECRET=your_webhook_secret
NODE_ENV=production
```

## 📊 Features Included

### ✅ Payment Processing

- Order creation
- Payment verification
- Webhook handling
- Signature validation

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
3. **Webhook Secret**: Set webhook secret in Razorpay dashboard
4. **Error Handling**: All APIs include proper error responses

## 🔄 Migration from Static to Server

Your resume builder now runs through the server, providing:

- ✅ Secure payment processing
- ✅ Webhook handling
- ✅ Better error management
- ✅ Production-ready architecture

The frontend code remains unchanged - all security improvements are handled server-side!
