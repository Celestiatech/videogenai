# 🔒 Remove Secrets from Git History

## ⚠️ Problem
GitHub Push Protection is blocking your push because secrets exist in git history (commit 956e816).

## ✅ Solution: Remove Secrets from History

### Option 1: Use git filter-repo (Recommended)

```bash
# Install git-filter-repo (if not installed)
# Ubuntu/Debian:
sudo apt install git-filter-repo

# Or via pip:
pip install git-filter-repo

# Remove the secret from all history
git filter-repo --invert-paths --path .env.local --force

# Remove token from DEPLOY_NOW.md in history
git filter-repo --replace-text <(echo "your_replicate_api_token_here==>your_replicate_api_token_here") --force

# Force push (⚠️ WARNING: This rewrites history!)
git push origin --force --all
```

### Option 2: Use BFG Repo Cleaner

```bash
# Download BFG: https://rtyley.github.io/bfg-repo-cleaner/

# Create a file with secrets to remove
echo "your_replicate_api_token_here" > secrets.txt
echo "your_ftp_password_here" >> secrets.txt

# Remove secrets
java -jar bfg.jar --replace-text secrets.txt

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push
git push origin --force --all
```

### Option 3: Manual Reset (If you haven't pushed yet)

```bash
# Reset to before the commit with secrets
git reset --soft 8fbc4a8  # Commit before 956e816

# Re-commit without secrets
git add .
git commit -m "Update video generation API without secrets"
git push origin --force main
```

---

## ⚠️ WARNING: Force Push

**Force pushing rewrites git history!** This will:
- Change commit hashes
- Require collaborators to re-clone the repository
- Delete commits with secrets

**Only do this if:**
- You're the only one working on this repository
- You haven't shared the repository widely
- You're okay with rewriting history

---

## 🎯 Quick Fix: Try Pushing First

GitHub might only check the new commits. Try:

```bash
git push origin main
```

If it still blocks, use one of the options above.

---

## 📝 After Removing Secrets

1. **Rotate your API keys:**
   - Generate a new Replicate API token
   - Update it in `.env.local` (not committed)
   - Update it in Vercel environment variables

2. **Change your FTP password:**
   - Log into InfinityFree dashboard
   - Change FTP password

3. **Verify .gitignore:**
   ```bash
   cat .gitignore | grep -E "\.env"
   ```
   Should show: `.env*.local` and `.env`

---

## 🔒 Prevention

**Never commit:**
- API keys
- Passwords
- Tokens
- Private keys
- `.env` files

**Always use:**
- `.env.local` (in .gitignore)
- Environment variables in hosting platforms
- Secret management services

