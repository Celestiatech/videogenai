# 🚀 Quick Deploy Guide - Do This Now!

## Step-by-Step Instructions to Deploy Your App

### Step 1: Prepare Your Code (5 minutes)

1. **Make sure your code is ready:**
   ```bash
   # Test build locally
   npm run build
   ```
   If there are errors, fix them first.

2. **Check your .env.local file:**
   - Make sure you have `REPLICATE_API_TOKEN` set
   - You'll need to add these to Vercel later

---

### Step 2: Create GitHub Repository (10 minutes)

1. **Go to GitHub:** https://github.com
   - Sign up or log in

2. **Create a new repository:**
   - Click the "+" icon → "New repository"
   - Name it: `videogenai` (or any name you like)
   - Make it **Public** or **Private** (your choice)
   - Don't initialize with README (we'll push existing code)
   - Click "Create repository"

3. **Push your code to GitHub:**
   ```bash
   cd /var/www/html/videogenai-1
   
   # Initialize git if not already done
   git init
   
   # Add all files
   git add .
   
   # Commit
   git commit -m "Initial commit - AI Video Generator"
   
   # Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
   git remote add origin https://github.com/YOUR_USERNAME/videogenai.git
   
   # Push to GitHub
   git branch -M main
   git push -u origin main
   ```

**Note:** Make sure `.env.local` is in `.gitignore` (it should be already)

---

### Step 3: Deploy to Vercel (5 minutes)

1. **Go to Vercel:** https://vercel.com
   - Click "Sign Up" or "Log In"
   - **Sign up with GitHub** (easiest option)

2. **Import your project:**
   - Click "Add New..." → "Project"
   - Click "Import" next to your GitHub repository
   - Vercel will detect it's a Next.js app automatically

3. **Configure the project:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)
   - **Install Command:** `npm install` (default)

4. **Add Environment Variables:**
   - Click "Environment Variables" section
   - Add these one by one:
   
   ```
   Name: REPLICATE_API_TOKEN
   Value: your_replicate_api_token_here
   ```
   
   ```
   Name: NEXTAUTH_SECRET
   Value: (generate one: openssl rand -base64 32)
   ```
   
   ```
   Name: NEXTAUTH_URL
   Value: https://your-app-name.vercel.app
   ```
   
   (You'll get the URL after first deployment, then update this)

5. **Deploy:**
   - Click "Deploy" button
   - Wait 2-3 minutes for build to complete
   - Your app will be live! 🎉

---

### Step 4: Update Environment Variables (2 minutes)

After first deployment:

1. **Get your app URL:**
   - It will be something like: `videogenai-abc123.vercel.app`
   - Copy this URL

2. **Update NEXTAUTH_URL:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Edit `NEXTAUTH_URL`
   - Set it to: `https://your-actual-url.vercel.app`
   - Save

3. **Redeploy:**
   - Go to Deployments tab
   - Click "..." on latest deployment → "Redeploy"

---

### Step 5: Test Your App (2 minutes)

1. **Visit your app URL:**
   - Go to `https://your-app.vercel.app`
   - Test video generation

2. **Check if it works:**
   - Try generating a video with text prompt
   - Check server logs in Vercel dashboard if there are errors

---

## 🎯 That's It! Your App is Live!

Your app will be accessible at: `https://your-app-name.vercel.app`

### What You Get:
- ✅ Free hosting
- ✅ Automatic HTTPS
- ✅ Global CDN (fast worldwide)
- ✅ Automatic deployments on git push
- ✅ Server logs and analytics
- ✅ Custom domain support (free)

---

## 🔧 Troubleshooting

### Build Fails:
- Check build logs in Vercel dashboard
- Make sure all dependencies are in `package.json`
- Run `npm run build` locally to test

### Environment Variables Not Working:
- Make sure variable names match exactly (case-sensitive)
- Redeploy after adding new variables
- Check Vercel logs for errors

### API Errors:
- Verify `REPLICATE_API_TOKEN` is correct
- Check Vercel function logs
- Make sure API key is active

---

## 📝 Next Steps (Optional)

1. **Add Custom Domain:**
   - Vercel Dashboard → Settings → Domains
   - Add your domain (free)

2. **Set Up Payment Gateway:**
   - Add Razorpay credentials if needed
   - Add to environment variables

3. **Monitor Usage:**
   - Check Vercel dashboard for usage stats
   - Monitor API costs (Replicate)

---

## 🆘 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Vercel Support:** https://vercel.com/support
- **GitHub Issues:** If you have code problems

---

## ⏱️ Total Time: ~25 minutes

- Step 1: 5 minutes (prepare code)
- Step 2: 10 minutes (GitHub setup)
- Step 3: 5 minutes (Vercel deploy)
- Step 4: 2 minutes (update env vars)
- Step 5: 2 minutes (test)

**Let's get your app live! 🚀**

