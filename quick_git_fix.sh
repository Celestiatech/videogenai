#!/bin/bash
echo "=== Quick Git Authentication Fix ==="
echo ""
echo "Choose an option:"
echo "1. Use Personal Access Token (Easiest)"
echo "2. Set up SSH key (Recommended)"
echo ""
read -p "Enter choice (1 or 2): " choice

if [ "$choice" == "1" ]; then
    echo ""
    echo "Step 1: Create token at https://github.com/settings/tokens"
    echo "Step 2: Select 'repo' scope"
    echo "Step 3: Copy the token"
    echo ""
    read -p "Press Enter after creating token..."
    
    git config --global credential.helper store
    echo ""
    echo "Now run: git push"
    echo "Username: vishalwebdevnew4"
    echo "Password: (paste your token)"
    
elif [ "$choice" == "2" ]; then
    echo ""
    echo "Generating SSH key..."
    ssh-keygen -t ed25519 -C "vishalwebdevnew4@github" -f ~/.ssh/id_ed25519 -N ""
    
    echo ""
    echo "✅ SSH key generated!"
    echo ""
    echo "Copy this key and add it to GitHub:"
    echo "https://github.com/settings/keys"
    echo ""
    cat ~/.ssh/id_ed25519.pub
    echo ""
    echo ""
    read -p "Press Enter after adding key to GitHub..."
    
    git remote set-url origin git@github.com:vishalwebdevnew4/videogenai.git
    echo ""
    echo "✅ Remote URL changed to SSH"
    echo ""
    echo "Test connection: ssh -T git@github.com"
    echo "Then push: git push"
fi
