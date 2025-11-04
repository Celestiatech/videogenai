# 🔑 API Keys Setup Guide

Complete guide on where to get all API keys needed for the AI Video Generator website.

## 📋 Table of Contents

1. [AI Video Generation](#1-ai-video-generation-required)
2. [Authentication](#2-authentication-required)
3. [Payment Gateway (Razorpay)](#3-payment-gateway-razorpay-required-for-payments)
4. [Email Service](#4-email-service-required)
5. [Quick Setup Checklist](#quick-setup-checklist)

---

## 1. AI Video Generation (REQUIRED)

You need **ONE** of these for video generation:

### Option A: fal.ai (Recommended) ⭐

**Why fal.ai?**
- Easy setup
- Good pricing
- Already installed in the project
- Fast generation times

**Steps to Get API Key:**

1. **Sign Up**
   - Go to: https://fal.ai
   - Click "Sign Up" or "Get Started"
   - Create your account

2. **Get API Key**
   - After signing up, go to: https://fal.ai/dashboard
   - Click on "API Keys" or "Settings"
   - Click "Create New API Key"
   - Copy the key (starts with `fal-`)

3. **Add to .env.local**
   ```env
   FAL_KEY=fal-your-api-key-here
   ```

4. **Pricing**
   - Check current pricing at: https://fal.ai/pricing
   - Usually pay-per-use model

---

### Option B: Replicate

**Why Replicate?**
- Wide variety of models
- Good for experimentation
- Multiple video generation options

**Steps to Get API Token:**

1. **Sign Up**
   - Go to: https://replicate.com
   - Click "Sign Up"
   - Create your account

2. **Get API Token**
   - Go to: https://replicate.com/account/api-tokens
   - Click "Create token"
   - Give it a name (e.g., "Video Generator")
   - Copy the token (starts with `r8_`)

3. **Install Package**
   ```bash
   npm install replicate
   ```

4. **Add to .env.local**
   ```env
   REPLICATE_API_TOKEN=r8_your-token-here
   ```

5. **Pricing**
   - Check pricing at: https://replicate.com/pricing
   - Pay-per-model-run

---

## 2. Authentication (REQUIRED)

### NextAuth Secret

**What it is:**
- A secret key used to encrypt session tokens
- Must be random and secure

**How to Generate:**

**Windows (PowerShell):**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

**Mac/Linux:**
```bash
openssl rand -base64 32
```

**Online Generator:**
- Go to: https://generate-secret.vercel.app/32
- Or use: https://randomkeygen.com

**Add to .env.local:**
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret-here
```

**For Production:**
- Change `NEXTAUTH_URL` to your actual domain
- Example: `NEXTAUTH_URL=https://yourdomain.com`

---

## 3. Payment Gateway - Razorpay (REQUIRED for payments)

**Why Razorpay?**
- Most popular in India
- Supports UPI, Cards, Net Banking, Wallets
- Easy integration
- Good documentation

**Steps to Get Razorpay Keys:**

1. **Sign Up**
   - Go to: https://razorpay.com
   - Click "Sign Up"
   - Create your business account
   - Complete KYC verification (required for live mode)

2. **Get Test Keys (for development)**
   - Login to: https://dashboard.razorpay.com
   - Go to **Settings** → **API Keys**
   - Click "Generate Test Keys"
   - Copy:
     - **Key ID** (starts with `rzp_test_`)
     - **Key Secret**

3. **Get Live Keys (for production)**
   - Complete business verification first
   - Go to **Settings** → **API Keys**
   - Click "Generate Live Keys"
   - Copy both keys

4. **Set Up Webhook**
   - Go to **Settings** → **Webhooks**
   - Click "Add New Webhook"
   - Webhook URL: `https://yourdomain.com/api/payment/webhook`
   - Select events: `payment.captured`, `payment.failed`, `order.paid`
   - Copy the **Webhook Secret**

5. **Add to .env.local:**
   ```env
   RAZORPAY_KEY_ID=rzp_test_your_key_id
   RAZORPAY_KEY_SECRET=your_key_secret
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id
   RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
   ```

**Documentation:**
- API Docs: https://razorpay.com/docs/api/
- Test Cards: https://razorpay.com/docs/payments/test-cards/

---

## 4. Email Service (REQUIRED)

You need SMTP credentials to send emails (welcome, payment confirmations, etc.).

### Option A: Gmail (Easiest for testing)

**Steps:**

1. **Enable 2-Step Verification**
   - Go to: https://myaccount.google.com/security
   - Enable "2-Step Verification"

2. **Generate App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Click "Generate"
   - Copy the 16-character password

3. **Add to .env.local:**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-16-char-app-password
   SMTP_FROM=noreply@aivideogen.com
   ```

**Limitations:**
- 500 emails/day limit
- Not recommended for production

---

### Option B: SendGrid (Recommended for production) ⭐

**Why SendGrid?**
- 100 free emails/day forever
- Reliable delivery
- Good analytics
- Easy setup

**Steps:**

1. **Sign Up**
   - Go to: https://sendgrid.com
   - Click "Start for Free"
   - Create account

2. **Verify Sender**
   - Go to **Settings** → **Sender Authentication**
   - Verify your email or domain

3. **Create API Key**
   - Go to **Settings** → **API Keys**
   - Click "Create API Key"
   - Name it (e.g., "Video Generator")
   - Select "Full Access" or "Mail Send"
   - Copy the API key (only shown once!)

4. **Add to .env.local:**
   ```env
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASSWORD=your-sendgrid-api-key-here
   SMTP_FROM=your-verified-email@domain.com
   ```

**Pricing:**
- Free: 100 emails/day
- Paid plans start at $19.95/month

---

### Option C: Mailgun

**Steps:**

1. **Sign Up**
   - Go to: https://mailgun.com
   - Create account

2. **Verify Domain**
   - Add and verify your domain
   - Get SMTP credentials from dashboard

3. **Add to .env.local:**
   ```env
   SMTP_HOST=smtp.mailgun.org
   SMTP_PORT=587
   SMTP_USER=your-mailgun-username
   SMTP_PASSWORD=your-mailgun-password
   SMTP_FROM=noreply@yourdomain.com
   ```

**Pricing:**
- Free: 5,000 emails/month for 3 months
- Then paid plans

---

## 5. Admin Email (REQUIRED)

Simply add your email address where you want to receive contact form submissions:

```env
ADMIN_EMAIL=your-email@domain.com
```

---

## 6. Base URL (REQUIRED for production)

**For Development:**
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**For Production:**
```env
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

---

## Quick Setup Checklist

### Minimum Required (to get started):
- [ ] `FAL_KEY` or `REPLICATE_API_TOKEN` (for video generation)
- [ ] `NEXTAUTH_SECRET` (generate one)
- [ ] `SMTP_USER` and `SMTP_PASSWORD` (for emails)
- [ ] `ADMIN_EMAIL` (your email)

### For Payments:
- [ ] `RAZORPAY_KEY_ID`
- [ ] `RAZORPAY_KEY_SECRET`
- [ ] `NEXT_PUBLIC_RAZORPAY_KEY_ID`
- [ ] `RAZORPAY_WEBHOOK_SECRET`

### For Production:
- [ ] Update `NEXTAUTH_URL` to your domain
- [ ] Update `NEXT_PUBLIC_BASE_URL` to your domain
- [ ] Use Live Razorpay keys (not test keys)
- [ ] Use production email service (SendGrid/Mailgun)

---

## 🚀 Quick Start Commands

1. **Copy the example file:**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Edit .env.local:**
   - Open `.env.local` in your editor
   - Fill in all required keys
   - Save the file

3. **Restart your server:**
   ```bash
   npm run dev
   ```

---

## 🔒 Security Notes

- **NEVER commit `.env.local` to Git** (it's already in .gitignore)
- **Never share your API keys** publicly
- **Use Test Keys** during development
- **Rotate keys** if accidentally exposed
- **Use different keys** for development and production

---

## 📞 Need Help?

If you're stuck getting any API key:
1. Check the official documentation links above
2. Most services have live chat support
3. Check their FAQ sections

---

## 💰 Estimated Costs (per month)

- **fal.ai**: Pay-per-use (~$0.01-0.05 per video)
- **Razorpay**: 2% transaction fee + ₹2 per transaction
- **SendGrid**: Free up to 100 emails/day
- **Total**: Very low cost to get started!

---

**Last Updated:** 2024
**Need Updates?** Check each service's official documentation for latest changes.

