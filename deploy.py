#!/usr/bin/env python3
"""
Quick deployment script for QR Ghost Prank
Helps deploy to various platforms
"""

import os
import subprocess
import zipfile
import shutil
from pathlib import Path

def create_deployment_package():
    """Create a clean deployment package"""
    
    # Files to include in deployment
    deployment_files = [
        'index.html',
        'styles.css', 
        'script.js',
        'README.md',
        'package.json',
        'netlify.toml',
        'vercel.json'
    ]
    
    # Create deployment folder
    deploy_dir = Path('deploy')
    deploy_dir.mkdir(exist_ok=True)
    
    # Copy files
    for file in deployment_files:
        if Path(file).exists():
            shutil.copy2(file, deploy_dir / file)
            print(f"✅ Copied {file}")
        else:
            print(f"⚠️ {file} not found")
    
    # Create ZIP for manual upload
    with zipfile.ZipFile('qr-ghost-prank-deploy.zip', 'w') as zipf:
        for file in deployment_files:
            if Path(file).exists():
                zipf.write(file)
    
    print("📦 Created qr-ghost-prank-deploy.zip for manual upload")
    return deploy_dir

def check_git():
    """Check if git is available and repo is initialized"""
    try:
        result = subprocess.run(['git', '--version'], capture_output=True, text=True)
        if result.returncode == 0:
            print("✅ Git is available")
            
            # Check if repo is initialized
            if Path('.git').exists():
                print("✅ Git repository initialized")
                return True
            else:
                print("⚠️ Not a git repository. Run 'git init' first.")
                return False
        else:
            print("❌ Git not found")
            return False
    except FileNotFoundError:
        print("❌ Git not installed")
        return False

def deploy_surge():
    """Deploy to Surge.sh"""
    try:
        # Check if surge is installed
        result = subprocess.run(['surge', '--version'], capture_output=True, text=True)
        if result.returncode != 0:
            print("Installing Surge.sh...")
            subprocess.run(['npm', 'install', '-g', 'surge'], check=True)
        
        print("🚀 Deploying to Surge.sh...")
        subprocess.run(['surge', '.', 'ghost-prank-' + str(hash(os.getcwd()))[-6:] + '.surge.sh'])
        
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("❌ Failed to deploy to Surge. Make sure Node.js and npm are installed.")

def show_deployment_options():
    """Show all deployment options"""
    print("=" * 60)
    print("🌐 QR GHOST PRANK DEPLOYMENT OPTIONS")
    print("=" * 60)
    print()
    
    print("📁 Files prepared for deployment:")
    deployment_files = ['index.html', 'styles.css', 'script.js', 'README.md']
    for file in deployment_files:
        status = "✅" if Path(file).exists() else "❌"
        print(f"   {status} {file}")
    print()
    
    print("🚀 DEPLOYMENT OPTIONS:")
    print()
    
    print("1. 🐙 GITHUB PAGES (Recommended)")
    print("   • Go to github.com and create new repository")
    print("   • Upload files or use git commands")
    print("   • Enable Pages in repository settings")
    print("   • Free custom domain: username.github.io/repo-name")
    print()
    
    print("2. 🌐 NETLIFY (Easiest)")
    print("   • Go to netlify.com")
    print("   • Drag & drop 'qr-ghost-prank-deploy.zip'")
    print("   • Instant deployment with custom URL")
    print("   • Free SSL certificate included")
    print()
    
    print("3. ⚡ VERCEL (Fast)")
    print("   • Go to vercel.com")
    print("   • Import from GitHub or upload files")
    print("   • Automatic deployments on updates")
    print()
    
    print("4. 🌊 SURGE.SH (Command Line)")
    print("   • Run: npm install -g surge")
    print("   • Run: surge")
    print("   • Follow prompts for domain name")
    print()
    
    print("🔗 After deployment, create QR codes with your public URL!")
    print("📱 Test on mobile devices to ensure camera access works.")

def main():
    """Main deployment helper"""
    print("🎭 QR Ghost Prank Deployment Helper")
    print()
    
    # Create deployment package
    create_deployment_package()
    
    print()
    
    # Check git availability
    git_available = check_git()
    
    print()
    
    # Show deployment options
    show_deployment_options()
    
    print("=" * 60)
    print("📋 QUICK CHECKLIST:")
    print("✅ Files ready for deployment")
    print("✅ Choose a hosting platform above")
    print("✅ Upload files and get public URL")
    print("✅ Create QR codes with public URL")
    print("✅ Test prank on mobile devices")
    print("=" * 60)

if __name__ == "__main__":
    main()