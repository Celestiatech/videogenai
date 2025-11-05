# 🔧 Fix Git Push Authentication Issues

## Problem
When pushing to GitHub, you're getting:
```
fatal: could not read Username for 'https://github.com': No such device or address
```

This happens because Git can't prompt for credentials in non-interactive environments.

---

## ✅ Solution 1: Use SSH (Recommended)

### Step 1: Check if you have SSH key
```bash
ls -la ~/.ssh/id_rsa.pub
```

### Step 2: If no SSH key, generate one
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
# Press Enter to accept default location
# Press Enter twice for no passphrase (or set one)
```

### Step 3: Copy your SSH public key
```bash
cat ~/.ssh/id_rsa.pub
# Copy the entire output
```

### Step 4: Add SSH key to GitHub
1. Go to: https://github.com/settings/keys
2. Click "New SSH key"
3. Title: "My Computer" (or any name)
4. Paste your public key
5. Click "Add SSH key"

### Step 5: Change remote URL to SSH
```bash
cd /var/www/html/videogenai-1
git remote set-url origin git@github.com:vishalwebdevnew4/videogenai.git
```

### Step 6: Test connection
```bash
ssh -T git@github.com
# Should say: "Hi vishalwebdevnew4! You've successfully authenticated..."
```

### Step 7: Push again
```bash
git push
```

---

## ✅ Solution 2: Use Personal Access Token

### Step 1: Create Personal Access Token
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name: "Videogenai Project"
4. Select scopes: ✅ `repo` (all repo permissions)
5. Click "Generate token"
6. **COPY THE TOKEN** (you won't see it again!)

### Step 2: Configure Git Credential Helper
```bash
git config --global credential.helper store
```

### Step 3: Change remote URL (keep HTTPS)
```bash
cd /var/www/html/videogenai-1
git remote set-url origin https://github.com/vishalwebdevnew4/videogenai.git
```

### Step 4: Push (will prompt for credentials once)
```bash
git push
# Username: vishalwebdevnew4
# Password: PASTE_YOUR_TOKEN_HERE (not your GitHub password!)
```

After first push, credentials will be saved.

---

## 🔍 Quick Fix: Check Current Remote URL

```bash
git remote -v
```

If it shows `https://`, you need authentication.
If it shows `git@`, you need SSH key.

---

## 🚀 Quick Commands

### Switch to SSH (if you have SSH key set up):
```bash
git remote set-url origin git@github.com:vishalwebdevnew4/videogenai.git
git push
```

### Switch to HTTPS (if you have token):
```bash
git remote set-url origin https://github.com/vishalwebdevnew4/videogenai.git
git push
# Enter username: vishalwebdevnew4
# Enter password: YOUR_PERSONAL_ACCESS_TOKEN
```

---

## ⚠️ Common Issues

### "Permission denied (publickey)"
- You haven't added SSH key to GitHub
- Or SSH key isn't loaded: `ssh-add ~/.ssh/id_ed25519`

### "Authentication failed"
- Personal access token is wrong/expired
- Token doesn't have `repo` scope

### "Repository not found"
- Repository doesn't exist or is private
- You don't have access to the repository

---

## 💡 Recommendation

**Use SSH** - it's more secure and you won't need to enter credentials every time.

---

## 📝 After Fixing

Once authentication works, you can push normally:
```bash
git add .
git commit -m "Your commit message"
git push
```

