# QR Ghost Prank System

A web-based prank application that captures photos using the device camera and applies spooky ghost effects. Perfect for creating shareable QR code pranks!

## 🎯 Features

- **Camera Capture**: Automatically captures a photo using the front camera after a 3-second countdown
- **Ghost Effects**: Applies random ghost/demon overlays with scary sound effects
- **Auto-Expiration**: Links automatically expire after 10 minutes for one-time use
- **Mobile Optimized**: Fully responsive design that works on all mobile devices
- **Privacy Focused**: No data is stored on servers - everything runs in the browser
- **Scary Audio**: Generates synthetic scary sounds using Web Audio API

## 📱 How It Works

1. **QR Code Scan**: User scans the QR code with their mobile device
2. **Permission Request**: App requests camera access with a friendly interface
3. **Photo Capture**: After 2-3 seconds, automatically takes a photo using front camera
4. **Ghost Effect**: Applies random ghost overlay with scary sounds and visual effects
5. **Full Screen Display**: Shows the final spooky result in full screen
6. **Auto Expiry**: Link becomes unavailable after 10 minutes

## 🚀 Quick Start

### Option 1: Host on GitHub Pages (Free)

1. **Create a GitHub Repository**:
   - Go to [GitHub](https://github.com) and create a new repository
   - Upload all the project files (`index.html`, `styles.css`, `script.js`)

2. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch" 
   - Choose "main" branch and "/" (root) folder
   - Save and wait for deployment

3. **Get Your URL**:
   - Your app will be available at: `https://yourusername.github.io/repository-name`

### Option 2: Host on Netlify (Free)

1. **Sign up for Netlify**: Go to [netlify.com](https://netlify.com)
2. **Drag and Drop**: Simply drag your project folder to the Netlify dashboard
3. **Get URL**: Netlify provides a random URL like `https://amazing-name-123456.netlify.app`

### Option 3: Host on Vercel (Free)

1. **Sign up for Vercel**: Go to [vercel.com](https://vercel.com)
2. **Import Project**: Connect your GitHub repo or drag and drop files
3. **Deploy**: Get instant deployment with auto-generated URL

## 🔗 Creating QR Codes

### Method 1: Online QR Generator
1. Go to [QR Code Generator](https://www.qr-code-generator.com/)
2. Enter your hosted URL
3. Download the QR code image
4. Print or share digitally

### Method 2: Google Charts API
```
https://chart.googleapis.com/chart?cht=qr&chl=YOUR_URL_HERE&chs=200x200
```
Replace `YOUR_URL_HERE` with your hosted URL.

### Method 3: Command Line (Node.js)
```bash
npm install -g qrcode-generator
qrcode "https://your-domain.com" qrcode.png
```

## 🛠️ Technical Details

### Browser Compatibility
- **Chrome 53+** (Android & iOS)
- **Safari 11+** (iOS)
- **Firefox 36+**
- **Edge 12+**

### Required Permissions
- **Camera Access**: Essential for photo capture
- **Audio Context**: For scary sound generation (auto-granted)

### Security Features
- No server communication required
- No personal data storage
- Client-side only processing
- Automatic link expiration

## 🎨 Customization

### Adding More Ghost Images
Edit the `ghostImages` array in `script.js`:
```javascript
this.ghostImages = [
    'data:image/svg+xml;base64,YOUR_BASE64_IMAGE1',
    'data:image/svg+xml;base64,YOUR_BASE64_IMAGE2',
    // Add more ghost images here
];
```

### Changing Expiration Time
Modify the `EXPIRATION_TIME` constant in `script.js`:
```javascript
const EXPIRATION_TIME = 10 * 60 * 1000; // 10 minutes
// Change to 5 minutes: 5 * 60 * 1000
// Change to 1 hour: 60 * 60 * 1000
```

### Customizing Sounds
Modify the `playScarySounds()` function to adjust:
- Frequency ranges
- Duration
- Volume levels
- Sound types

## 📋 File Structure
```
QRghost/
├── index.html          # Main HTML structure
├── styles.css          # Responsive CSS styling
├── script.js           # Core JavaScript functionality
└── README.md           # This documentation
```

## 🚨 Troubleshooting

### Camera Not Working
- Ensure HTTPS hosting (required for camera access)
- Check browser permissions
- Try refreshing the page
- Test on different browsers

### Audio Not Playing
- Some browsers require user interaction before audio
- Try on mobile devices (usually better audio support)
- Check device volume settings

### Link Not Expiring
- Clear browser localStorage
- Try incognito/private browsing
- Check system clock accuracy

## 📱 Mobile Testing

Test your prank on:
- Different screen sizes
- Portrait/landscape orientations  
- Various browsers (Chrome, Safari, Firefox)
- Different mobile operating systems

## ⚖️ Legal Considerations

- **Consent**: Only use with willing participants
- **Privacy**: Inform users that photos are taken
- **Location**: Respect local privacy laws
- **Context**: Use responsibly and appropriately

## 🔧 Development

To modify or enhance the project:

1. **Local Development**:
   ```bash
   # Start a local server
   python -m http.server 8000
   # Or use Node.js
   npx serve .
   ```

2. **Test Changes**: Always test on actual mobile devices

3. **Deploy Updates**: Push changes to your hosting platform

## 🎉 Tips for Best Results

1. **Good Lighting**: Ensure adequate lighting for clear photos
2. **Stable Connection**: Reliable internet for quick loading
3. **Clear Instructions**: Tell users what to expect
4. **Quick Setup**: Have QR codes ready to scan
5. **Backup Plan**: Test everything before the prank

## 🆘 Support

If you encounter issues:

1. Check browser console for errors
2. Verify HTTPS hosting
3. Test camera permissions manually
4. Try different devices/browsers
5. Check hosting service status

---

**Enjoy your spooky pranks! 👻**