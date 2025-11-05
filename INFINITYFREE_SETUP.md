# InfinityFree Hosting Setup Guide

## ⚠️ Important Limitation

**InfinityFree does NOT support Node.js/Next.js applications.** Your app has API routes that require a Node.js server, which InfinityFree cannot run.

## 📋 Your FTP Credentials

- **FTP Hostname**: `ftpupload.net`
- **FTP Port**: `21`
- **FTP Username**: `if0_40337361`
- **FTP Password**: `your_ftp_password_here`

## 🔄 Recommended Solution: Hybrid Approach

### Option 1: Use InfinityFree for Landing Page + Deploy API Elsewhere

1. **Deploy the Next.js app to Vercel** (free, supports Node.js)
   - Your full app with API routes will work there
   - Get a URL like: `your-app.vercel.app`

2. **Create a simple landing page on InfinityFree**
   - Use FTP to upload a simple HTML page
   - This page can redirect to or embed your Vercel-hosted app

3. **Use your custom domain** (if you have one)
   - Point it to your Vercel deployment
   - Or use InfinityFree domain for landing page

---

### Option 2: Static Export (⚠️ API Routes Won't Work)

If you try to deploy to InfinityFree, only the frontend will work, but video generation will fail because API routes need a server.

**To create a static export:**
```bash
# In next.config.js, add:
output: 'export'

# Then build:
npm run build

# This creates an 'out' folder with static files
```

**Upload the `out` folder contents to InfinityFree via FTP.**

**But remember:** Your `/api/generate-video` endpoint won't work because there's no Node.js server!

---

## 📁 FTP Upload Instructions (For Static Files Only)

If you want to upload static files to InfinityFree:

1. **Install FTP Client:**
   - Windows: FileZilla, WinSCP
   - Mac: FileZilla, Cyberduck
   - Linux: FileZilla, or command line `ftp`

2. **Connect to FTP:**
   - Host: `ftpupload.net`
   - Port: `21`
   - Username: `if0_40337361`
   - Password: `your_ftp_password_here`

3. **Upload Files:**
   - Connect to the FTP server
   - Navigate to `htdocs` or `public_html` folder
   - Upload your static files there

---

## 🎯 Best Practice: Deploy to Vercel

Since your app requires Node.js, I **strongly recommend** deploying to Vercel instead:

1. **Create GitHub Repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to https://vercel.com
   - Sign up/login
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables:
     - `REPLICATE_API_TOKEN`
     - `NEXTAUTH_SECRET`
     - `NEXTAUTH_URL`
   - Deploy!

3. **Your app will be live** at `your-app.vercel.app`

---

## 🔐 Security Note

⚠️ **IMPORTANT:** Your FTP password is visible in this conversation. After deployment, consider:
- Changing your FTP password in InfinityFree dashboard
- Never share FTP credentials publicly
- Use environment variables for sensitive data

---

## 💡 Alternative: Use InfinityFree for Static Landing Page

You can create a beautiful landing page on InfinityFree that:
- Explains your service
- Has a link/button to "Generate Video"
- Redirects to your Vercel-hosted app (where the actual functionality works)

This way you can use both:
- InfinityFree: For a simple landing page
- Vercel: For the actual Next.js application with API routes

---

## 📞 Next Steps

1. **If you want full functionality:**
   - Deploy to Vercel (recommended)
   - Your app will work completely

2. **If you want to use InfinityFree:**
   - Only static files will work
   - API routes (video generation) will fail
   - Consider the hybrid approach above

---

## 🆘 Need Help?

- Check `DEPLOYMENT_GUIDE.md` for detailed deployment instructions
- Vercel has excellent documentation: https://vercel.com/docs
- InfinityFree knowledge base: https://forum.infinityfree.com

