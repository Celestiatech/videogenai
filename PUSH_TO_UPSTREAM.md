# 🔄 Push to Upstream Repository (Celestiatech)

## Goal
Push your `main-clean` branch to `Celestiatech/videogenai` repository so Vercel can deploy it.

---

## 🔐 Authentication Required

To push to the Celestiatech repository, you need authentication.

---

## ✅ Method 1: Personal Access Token (Recommended)

### Step 1: Create Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. **Name**: `Celestiatech Push` (or any name)
4. **Expiration**: 90 days (or your preference)
5. **Select scopes**: ✅ `repo` (all repository permissions)
6. Click "Generate token"
7. **COPY THE TOKEN** (you won't see it again!)

### Step 2: Configure Git Credential Helper

```bash
git config --global credential.helper store
```

This saves your credentials so you don't need to enter them every time.

### Step 3: Push to Upstream

```bash
cd /var/www/html/videogenai-1
git push upstream main-clean:main
```

When prompted:
- **Username**: Your GitHub username (not Celestiatech)
- **Password**: Paste your Personal Access Token (not your GitHub password!)

### Step 4: Verify

Check if the push was successful:
```bash
git fetch upstream
git log upstream/main --oneline -5
```

You should see your latest commits!

---

## ✅ Method 2: SSH (If You Have SSH Key)

### Step 1: Change Remote to SSH

```bash
git remote set-url upstream git@github.com:Celestiatech/videogenai.git
```

### Step 2: Test SSH Connection

```bash
ssh -T git@github.com
```

Should say: "Hi [username]! You've successfully authenticated..."

### Step 3: Push

```bash
git push upstream main-clean:main
```

---

## 📋 What This Does

- Pushes your `main-clean` branch to Celestiatech's `main` branch
- Updates the Celestiatech repository with all your fixes
- Vercel will automatically detect the changes and redeploy

---

## ⚠️ Important Notes

1. **You need write access** to `Celestiatech/videogenai` repository
2. If you don't have write access, you'll need to:
   - Request access from repository owner, OR
   - Create a Pull Request instead

3. **After pushing**, Vercel should automatically redeploy
4. **Check Vercel dashboard** to see the new deployment

---

## 🔍 Verify Push Was Successful

```bash
# Fetch latest from upstream
git fetch upstream

# Check what's on upstream/main
git log upstream/main --oneline -5

# Compare with your local branch
git log main-clean --oneline -5
```

If commits match, the push was successful!

---

## 🆘 Troubleshooting

### "Permission denied"
- You don't have write access to Celestiatech repository
- Contact repository owner for access
- Or create a Pull Request instead

### "Authentication failed"
- Token might be expired or incorrect
- Make sure token has `repo` scope
- Generate a new token

### "Repository not found"
- Repository might be private
- You might not have access
- Check repository URL is correct

---

## 🎯 After Successful Push

1. **Check Vercel Dashboard**
   - Should automatically trigger new deployment
   - Look for "Deploying..." status

2. **Monitor Build**
   - Check if build succeeds
   - Should now have `.npmrc` file (fixes dependency conflict)

3. **Verify Deployment**
   - Visit your Vercel URL
   - Test the application

---

## 📝 Quick Commands

```bash
# Configure credential helper (one time)
git config --global credential.helper store

# Push to upstream
git push upstream main-clean:main

# Verify
git fetch upstream
git log upstream/main --oneline -5
```

