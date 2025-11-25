# 🌐 Deploy QR Ghost Prank - Free Hosting Guide

This guide will help you deploy your QR Ghost Prank to the internet for **FREE** so anyone can access it!

## 🚀 Quick Deploy Options

### Option 1: GitHub Pages (Recommended - FREE)

#### Step 1: Upload to GitHub
1. **Create GitHub Account**: Go to [github.com](https://github.com) (free)
2. **Create New Repository**: 
   - Click "+" → "New repository"
   - Name it: `qr-ghost-prank`
   - Make it **Public**
   - Click "Create repository"

#### Step 2: Upload Files
**Method A: GitHub Web Interface**
1. Click "uploading an existing file"
2. Drag all these files:
   - `index.html`
   - `styles.css` 
   - `script.js`
   - `README.md`
3. Write commit message: "Initial QR Ghost Prank upload"
4. Click "Commit changes"

**Method B: Git Commands (if you have Git)**
```bash
git init
git add .
git commit -m "Initial QR Ghost Prank upload"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/qr-ghost-prank.git
git push -u origin main
```

#### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Under "Source": Select **Deploy from a branch**
5. Branch: Select **main**
6. Folder: Select **/ (root)**
7. Click **Save**

#### Step 4: Get Your Public URL
- Your prank will be available at:
  `https://YOUR-USERNAME.github.io/qr-ghost-prank`
- GitHub will show you the exact URL in the Pages settings
- **Takes 5-10 minutes to go live**

---

### Option 2: Netlify (Super Easy - FREE)

#### Step 1: Prepare Files
1. Create a ZIP file with all your project files:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`

#### Step 2: Deploy
1. Go to [netlify.com](https://netlify.com)
2. **Drag and drop** your ZIP file onto the Netlify dashboard
3. **Instant deployment!** You get a URL like:
   `https://amazing-prank-123456.netlify.app`

#### Step 3: Custom Domain (Optional)
- Change the random name to something like:
  `https://ghost-prank-scary.netlify.app`

---

### Option 3: Vercel (Developer-Friendly - FREE)

#### Step 1: Upload to GitHub (same as Option 1)

#### Step 2: Connect Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click **Import Project**
4. Select your `qr-ghost-prank` repository
5. Click **Deploy**

#### Step 3: Get URL
- Instant URL like: `https://qr-ghost-prank.vercel.app`

---

### Option 4: Surge.sh (Command Line - FREE)

```bash
# Install Surge
npm install -g surge

# Deploy (run in your project folder)
surge

# Follow prompts:
# - Email: your-email@example.com
# - Domain: ghost-prank.surge.sh (or any available name)
```

Your prank is live at: `https://ghost-prank.surge.sh`

---

## 📱 Creating QR Codes for Public Access

Once deployed, create QR codes with your public URL:

### Online QR Generators
1. **[qr-code-generator.com](https://qr-code-generator.com)**
   - Enter your public URL
   - Download high-quality QR code

2. **[qrcode-monkey.com](https://qrcode-monkey.com)**
   - Add custom colors/logos
   - Bulk generation

3. **[Google Chart API](https://developers.google.com/chart/infographics/docs/qr_codes)**
   ```
   https://chart.googleapis.com/chart?cht=qr&chl=YOUR-PUBLIC-URL&chs=300x300
   ```

### Batch QR Code Creation
```python
# Save this as qr_batch.py
import requests
import urllib.parse

def create_qr(url, filename, size="300x300"):
    encoded_url = urllib.parse.quote(url)
    qr_url = f"https://chart.googleapis.com/chart?cht=qr&chl={encoded_url}&chs={size}"
    
    response = requests.get(qr_url)
    with open(f"{filename}.png", "wb") as f:
        f.write(response.content)
    print(f"✅ Created {filename}.png")

# Replace with your actual deployed URL
your_url = "https://YOUR-USERNAME.github.io/qr-ghost-prank"

create_qr(your_url, "ghost_prank_qr")
create_qr(your_url, "ghost_prank_qr_large", "500x500")
```

---

## 🔧 Deployment Checklist

### ✅ Before Going Live:
- [ ] Test on mobile devices
- [ ] Verify camera permissions work
- [ ] Test manual photo upload
- [ ] Check ghost effects and sounds
- [ ] Ensure link expiration works (10 minutes)

### ✅ After Deployment:
- [ ] Test public URL on different devices
- [ ] Generate QR codes
- [ ] Test QR codes on mobile
- [ ] Share with friends for testing

### ✅ Security & Privacy:
- [ ] No personal data is stored
- [ ] Everything runs client-side
- [ ] Photos never leave the device
- [ ] Links auto-expire

---

## 🎯 Usage Tips

### For Maximum Prank Effect:
1. **Don't reveal it's a prank** before they scan
2. **Good lighting** for best photo quality
3. **Tell them to allow camera** when prompted
4. **Have backup QR codes** ready
5. **Test different ghost effects**

### Sharing Your QR Codes:
- **Print them** for physical pranks
- **Send digital images** via chat
- **Embed in websites** or social media
- **Create stickers** for guerrilla pranking

---

## 🚨 Important Notes

### Domain Requirements:
- **HTTPS is automatic** on all these platforms
- **Camera access works** on public domains
- **Mobile-optimized** by default

### Legal Considerations:
- **Get consent** before pranking
- **Respect privacy laws** in your region
- **Use responsibly** - it's meant to be fun!

### Troubleshooting:
- If deployment fails, check file names match exactly
- Ensure no spaces in filenames
- Test locally first with `python -m http.server`

---

## 🎉 You're Ready!

Choose your preferred hosting method above and get your prank online in minutes. Once live, anyone with the QR code can be pranked! 👻

**Recommended**: Start with GitHub Pages - it's free, reliable, and gives you version control.