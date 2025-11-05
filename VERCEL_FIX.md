# 🔧 Fix Vercel Build Error

## Problem
Vercel build is failing with dependency conflict:
```
npm error ERESOLVE could not resolve
npm error peerOptional nodemailer@"^7.0.7" from next-auth@4.24.13
npm error Found: nodemailer@6.10.1
```

## Root Cause
Vercel is deploying from `Celestiatech/videogenai` repository, which has the old `nodemailer@^6.9.7` version.

## ✅ Solution

### Option 1: Update Vercel to Use Your Repository (Recommended)

1. **Go to Vercel Dashboard**
   - https://vercel.com/dashboard

2. **Remove current project** (if it exists)
   - Go to project settings
   - Delete the project

3. **Add New Project**
   - Click "Add New..." → "Project"
   - Import from: `vishalwebdevnew4/videogenai`
   - Select branch: `main-clean` (or `main`)
   - Configure build settings
   - Add environment variables

### Option 2: Update the Celestiatech Repository

If you have access to `Celestiatech/videogenai`:

1. Update `package.json` in that repository:
   ```json
   "nodemailer": "^7.0.7"
   ```

2. Commit and push

### Option 3: Add .npmrc to Force Resolution

Create `.npmrc` file in your project root:

```
legacy-peer-deps=true
```

This will allow npm to install despite peer dependency conflicts.

---

## 🎯 Quick Fix

1. **Create `.npmrc` file:**
   ```bash
   echo "legacy-peer-deps=true" > .npmrc
   ```

2. **Commit and push:**
   ```bash
   git add .npmrc
   git commit -m "Add .npmrc to resolve dependency conflicts"
   git push origin main-clean
   ```

3. **Vercel will automatically redeploy**

---

## 📝 Current Status

✅ **Local package.json**: Already has `nodemailer@^7.0.7` (correct)
❌ **Vercel repository**: Using `Celestiatech/videogenai` (might have old version)

**Action needed**: Either switch Vercel to your repository OR add `.npmrc` file

---

## 🔍 Verify in Vercel

After fixing, check:
1. Vercel dashboard → Your project → Settings → Git
2. Verify it's connected to the correct repository
3. Check which branch it's deploying from

