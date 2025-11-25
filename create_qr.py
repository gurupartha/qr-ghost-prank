#!/usr/bin/env python3
"""
QR Code Generator for Ghost Prank
Creates multiple QR codes for your deployed prank
"""

import urllib.request
import urllib.parse

def generate_qr_codes():
    """Generate QR codes for the deployed prank"""
    
    # Your URLs (replace with your actual deployed URLs)
    urls = {
        "github": "https://gurupartha.github.io/qr-ghost-prank",
        "netlify": "https://your-app.netlify.app"  # Update with your Netlify URL
    }
    
    print("🎭 GENERATING QR CODES FOR GHOST PRANK")
    print("=" * 50)
    
    for name, url in urls.items():
        print(f"\n📱 {name.upper()} QR CODE:")
        print(f"URL: {url}")
        
        # Create QR code using Google Charts API
        encoded_url = urllib.parse.quote(url)
        qr_url = f"https://chart.googleapis.com/chart?cht=qr&chl={encoded_url}&chs=300x300&chld=M|0"
        
        print(f"QR Code Image: {qr_url}")
        
        # Try to download the QR code image
        try:
            filename = f"qr_code_{name}.png"
            urllib.request.urlretrieve(qr_url, filename)
            print(f"✅ Downloaded: {filename}")
        except Exception as e:
            print(f"❌ Failed to download: {e}")
    
    print("\n" + "=" * 50)
    print("📋 HOW TO USE YOUR QR CODES:")
    print("1. Share the QR code images with friends")
    print("2. Print them out for physical pranks")
    print("3. Send via chat/social media")
    print("4. When someone scans → PRANK ACTIVATED! 👻")
    
    print("\n🔗 MANUAL QR GENERATORS:")
    print("- qr-code-generator.com")
    print("- qrcode-monkey.com")
    print("- qr.io")
    
    # Open QR generator with pre-filled URL
    try:
        import webbrowser
        github_url = urls["github"]
        generator_url = f"https://qr-code-generator.com/?url={urllib.parse.quote(github_url)}"
        print(f"\n🌐 Opening QR generator...")
        webbrowser.open(generator_url)
    except Exception as e:
        print(f"Could not open browser: {e}")

if __name__ == "__main__":
    generate_qr_codes()