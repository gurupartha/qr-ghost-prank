#!/usr/bin/env python3
"""
Simple HTTPS server for testing camera access locally
Creates a self-signed certificate for HTTPS support
"""

import http.server
import ssl
import socketserver
import os
from pathlib import Path

def create_self_signed_cert():
    """Create a self-signed certificate for HTTPS"""
    try:
        import subprocess
        
        # Create certificate using openssl (if available)
        cert_file = "server.crt"
        key_file = "server.key"
        
        if not (Path(cert_file).exists() and Path(key_file).exists()):
            print("Creating self-signed certificate...")
            subprocess.run([
                "openssl", "req", "-x509", "-newkey", "rsa:4096", 
                "-keyout", key_file, "-out", cert_file, 
                "-days", "365", "-nodes",
                "-subj", "/C=US/ST=CA/L=LA/O=Test/CN=localhost"
            ], check=True)
            print(f"✅ Created {cert_file} and {key_file}")
        
        return cert_file, key_file
    except (ImportError, subprocess.CalledProcessError, FileNotFoundError):
        print("❌ OpenSSL not found. Using HTTP instead.")
        return None, None

def start_https_server(port=8443):
    """Start HTTPS server"""
    cert_file, key_file = create_self_signed_cert()
    
    if cert_file and key_file:
        handler = http.server.SimpleHTTPRequestHandler
        
        with socketserver.TCPServer(("", port), handler) as httpd:
            context = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
            context.load_cert_chain(cert_file, key_file)
            httpd.socket = context.wrap_socket(httpd.socket, server_side=True)
            
            print(f"🔒 HTTPS Server running at https://localhost:{port}")
            print(f"📱 Use this URL for camera access: https://localhost:{port}")
            print("⚠️  You may see a security warning - click 'Advanced' then 'Proceed'")
            print("🛑 Press Ctrl+C to stop")
            
            try:
                httpd.serve_forever()
            except KeyboardInterrupt:
                print("\n🛑 Server stopped")
    else:
        start_http_server()

def start_http_server(port=8000):
    """Start HTTP server as fallback"""
    handler = http.server.SimpleHTTPRequestHandler
    
    with socketserver.TCPServer(("", port), handler) as httpd:
        print(f"🌐 HTTP Server running at http://localhost:{port}")
        print(f"📱 Camera may not work on HTTP - use HTTPS for full functionality")
        print("🛑 Press Ctrl+C to stop")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == "--https":
        start_https_server()
    else:
        print("🔧 Starting HTTP server...")
        print("💡 For camera access, run: python serve.py --https")
        print()
        start_http_server()