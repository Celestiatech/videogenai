# 🚀 Deployment Guide for AI Video Generator

## ⚠️ Important: InfinityFree Limitation

**InfinityFree does NOT support Node.js/Next.js applications.** It only supports PHP-based websites.

Your Next.js application requires Node.js runtime, so you'll need a different hosting service.

## ✅ Recommended Hosting Options (Free/Paid)

### 1. **Vercel** (⭐ Recommended - Best for Next.js)
- **Free Tier**: Yes, generous free tier
- **Node.js Support**: ✅ Full support
- **Next.js Support**: ✅ Native support (made by Vercel)
- **Deployment**: Very easy, connects to GitHub
- **URL**: https://vercel.com

**Steps to Deploy:**
1. Push your code to GitHub
2. Sign up at https://vercel.com
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables (FAL_KEY, REPLICATE_API_TOKEN, etc.)
6. Deploy!

**Pros:**
- Easiest deployment for Next.js
- Automatic HTTPS
- Global CDN
- Free tier includes custom domains
- Automatic deployments on git push

---

### 2. **Netlify** (Good Alternative)
- **Free Tier**: Yes
- **Node.js Support**: ✅ Full support
- **Next.js Support**: ✅ Full support
- **URL**: https://netlify.com

**Steps to Deploy:**
1. Push code to GitHub
2. Sign up at https://netlify.com
3. Click "Add new site" → "Import an existing project"
4. Connect GitHub repository
5. Build command: `npm run build`
6. Publish directory: `.next`
7. Add environment variables
8. Deploy!

---

### 3. **Railway** (Good for Full-Stack Apps)
- **Free Tier**: Yes (with credit card for verification)
- **Node.js Support**: ✅ Full support
- **Next.js Support**: ✅ Full support
- **URL**: https://railway.app

**Steps to Deploy:**
1. Sign up at https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Connect your repository
5. Add environment variables
6. Railway auto-detects Next.js and deploys

---

### 4. **Render** (Free Tier Available)
- **Free Tier**: Yes
- **Node.js Support**: ✅ Full support
- **Next.js Support**: ✅ Full support
- **URL**: https://render.com

**Steps to Deploy:**
1. Sign up at https://render.com
2. Click "New" → "Web Service"
3. Connect GitHub repository
4. Select "Next.js" as environment
5. Add environment variables
6. Deploy!

---

### 5. **VPS Hosting** (More Control, Requires Setup)
- **Options**: DigitalOcean, Linode, Vultr, AWS Lightsail
- **Cost**: $5-10/month
- **Node.js Support**: ✅ Full support (you install it)
- **Control**: Full server control

**Steps:**
1. Create VPS instance
2. Install Node.js, npm, PM2
3. Clone your repository
4. Install dependencies
5. Build and start with PM2
6. Configure Nginx as reverse proxy
7. Set up SSL with Let's Encrypt

---

## 📋 Pre-Deployment Checklist

Before deploying, make sure you have:

1. ✅ **Environment Variables Ready:**
   - `FAL_KEY` or `REPLICATE_API_TOKEN`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (your production domain)
   - `RAZORPAY_KEY_ID` (if using payments)
   - `RAZORPAY_KEY_SECRET` (if using payments)

2. ✅ **Build Test:**
   ```bash
   npm run build
   ```
   Make sure it builds without errors!

3. ✅ **GitHub Repository:**
   - Push your code to GitHub
   - Make sure `.env.local` is in `.gitignore` (never commit secrets!)

4. ✅ **Database Setup:**
   - If using a database, set it up on the hosting platform
   - Update connection strings in environment variables

---

## 🎯 Quick Start: Deploy to Vercel (Recommended)

1. **Install Vercel CLI** (optional, but helpful):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   Follow the prompts, and it will deploy!

4. **Add Environment Variables**:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add all your environment variables

5. **Redeploy** (to pick up new env vars):
   ```bash
   vercel --prod
   ```

---

## 🔒 Security Checklist

- [ ] Never commit `.env.local` to Git
- [ ] Use strong `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`)
- [ ] Set `NEXTAUTH_URL` to your production domain
- [ ] Enable HTTPS (automatic on Vercel/Netlify)
- [ ] Keep dependencies updated
- [ ] Use environment variables for all secrets

---

## 📝 Environment Variables Template

Create these in your hosting platform's environment variables section:

```env
# AI Video Generation
REPLICATE_API_TOKEN=r8_your_token_here

# Authentication
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-secret-here

# Payment Gateway (if using)
RAZORPAY_KEY_ID=rzp_live_your_key
RAZORPAY_KEY_SECRET=your_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_your_key
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# Database (if using)
DATABASE_URL=your_database_url
```

---

## 🆘 Troubleshooting

### Build Fails
- Check for TypeScript errors: `npm run lint`
- Ensure all dependencies are in `package.json`
- Check Node.js version compatibility

### Environment Variables Not Working
- Restart the deployment after adding env vars
- Make sure variable names match exactly (case-sensitive)
- Check that you're using the production environment

### API Errors
- Verify API keys are correct
- Check API service status (Replicate, fal.ai)
- Review server logs for detailed error messages

---

## 💡 Recommendation

**For this Next.js application, I strongly recommend Vercel** because:
- Made by the creators of Next.js
- Zero-config deployment
- Free tier is generous
- Automatic HTTPS and CDN
- Easy environment variable management
- Free custom domain support

---

## 📞 Need Help?

If you need help with deployment:
1. Check the hosting platform's documentation
2. Review server logs for errors
3. Test locally first with `npm run build && npm start`
4. Verify all environment variables are set correctly

