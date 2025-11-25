class QRGhostPrank {
    constructor() {
        this.stream = null;
        this.capturedImage = null;
        this.linkExpired = false;
        this.countdownTimer = null;
        this.cameraAttempts = 0;
        this.ghostImages = [
            // TERRIFYING ZOMBIE FACE - Like the image you showed!
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGZpbHRlciBpZD0iaG9ycm9yIj48ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlR3JhcGhpYyIgdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjxmZUNvbXBvbmVudFRyYW5zZmVyIGluPSJjb2xvck1hdHJpeCIgdHlwZT0idGFibGUiIHRhYmxlVmFsdWVzPSIwLjMgMC4zIDAuMyAwLjcgMC43IDAuNyAxIDEgMSIvPjxmZUNvbXBvc2l0ZSBvcGVyYXRvcj0ib3ZlciIgaW49ImNvbG9yTWF0cml4IiBpbjI9IlNvdXJjZUdyYXBoaWMiLz48L2ZpbHRlcj48L2RlZnM+PGVsbGlwc2UgY3g9IjEwMCIgY3k9IjEwNSIgcng9Ijg1IiByeT0iOTAiIGZpbGw9IiMyODI4MjgiIGZpbGwtb3BhY2l0eT0iMC45OCIvPjxjaXJjbGUgY3g9IjEwMiIgY3k9IjEwNSIgcj0iNzgiIGZpbGw9IiMzQTNBM0EiLz48ZWxsaXBzZSBjeD0iODIiIGN5PSI4MiIgcng9IjIwIiByeT0iMjgiIGZpbGw9IiMwMDAwMDAiLz48ZWxsaXBzZSBjeD0iMTIyIiBjeT0iODIiIHJ4PSIyMCIgcnk9IjI4IiBmaWxsPSIjMDAwMDAwIi8+PGNpcmNsZSBjeD0iODIiIGN5PSI4MiIgcj0iMTAiIGZpbGw9IiNGRkZGRkYiIGZpbGwtb3BhY2l0eT0iMC4xNSIvPjxjaXJjbGUgY3g9IjEyMiIgY3k9IjgyIiByPSIxMCIgZmlsbD0iI0ZGRkZGRiIgZmlsbC1vcGFjaXR5PSIwLjE1Ii8+PGVsbGlwc2UgY3g9IjEwMiIgY3k9IjExNSIgcng9IjE4IiByeT0iMTAiIGZpbGw9IiMwMDAwMDAiLz48ZWxsaXBzZSBjeD0iMTAyIiBjeT0iMTQyIiByeD0iMzUiIHJ5PSIzMCIgZmlsbD0iIzAwMDAwMCIvPjxyZWN0IHg9Ijg1IiB5PSIxNDIiIHdpZHRoPSI4IiBoZWlnaHQ9IjE4IiBmaWxsPSIjRkZGRkZGIiByeD0iMiIvPjxyZWN0IHg9IjEwMCIgeT0iMTQyIiB3aWR0aD0iOCIgaGVpZ2h0PSIxOCIgZmlsbD0iI0ZGRkZGRiIgcng9IjIiLz48cmVjdCB4PSIxMTUiIHk9IjE0MiIgd2lkdGg9IjgiIGhlaWdodD0iMTgiIGZpbGw9IiNGRkZGRkYiIHJ4PSIyIi8+PGVsbGlwc2UgY3g9IjY1IiBjeT0iNjAiIHJ4PSIxMCIgcnk9IjI1IiBmaWxsPSIjNDQ0NDQ0IiB0cmFuc2Zvcm09InJvdGF0ZSgtMjAgNjUgNjApIi8+PGVsbGlwc2UgY3g9IjE0NSIgY3k9IjYwIiByeD0iMTAiIHJ5PSIyNSIgZmlsbD0iIzQ0NDQ0NCIgdHJhbnNmb3JtPSJyb3RhdGUoMjAgMTQ1IDYwKSIvPjxwYXRoIGQ9Ik01NSA5OCBMNDQ5NSIgc3Ryb2tlPSIjMUExQTFBIiBzdHJva2Utd2lkdGg9IjQiLz48cGF0aCBkPSJNMTQ1IDk4IEwxMzAgMTE4IiBzdHJva2U9IiMxQTFBMUEiIHN0cm9rZS13aWR0aD0iNCIvPjxwYXRoIGQ9Ik02NSA3OCBMODI5NSIgc3Ryb2tlPSIjM0EzQTNBIiBzdHJva2Utd2lkdGg9IjMiLz48cGF0aCBkPSJNMTQ1IDc4IEwxMjIgOTUiIHN0cm9rZT0iIzNBM0EzQSIgc3Ryb2tlLXdpZHRoPSIzIi8+PHBhdGggZD0iTTkwIDE4MCBMMTA4IDE5NSBMMTIwIDEzMyIgc3Ryb2tlPSIjMjAwMDAwIiBzdHJva2Utd2lkdGg9IjMiIGZpbGw9Im5vbmUiLz48L3N2Zz4=',
            // Terrifying demon skull
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSI5MCIgZmlsbD0iIzAwMDAwMCIgZmlsbC1vcGFjaXR5PSIwLjkiLz48Y2lyY2xlIGN4PSI3MCIgY3k9IjgwIiByPSIxOCIgZmlsbD0iI0ZGMDAwMCIvPjxjaXJjbGUgY3g9IjEzMCIgY3k9IjgwIiByPSIxOCIgZmlsbD0iI0ZGMDAwMCIvPjxwYXRoIGQ9Ik04MCAzMCBMMTAwIDUwIEwxMjAgMzAiIHN0cm9rZT0iI0ZGMDAwMCIgc3Ryb2tlLXdpZHRoPSI4Ii8+PHBhdGggZD0iTTcwIDEyMCBMMTMwIDEyMCBMMTI1IDE1MCBMODA5IDE1MCBMNzUgMTUwIFoiIGZpbGw9IiNGRjAwMDAiLz48cGF0aCBkPSJNODAgMTYwIEw5NSAxNzAgTDEwNSAxNzAgTDEyMCAxNjAiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSI0Ii8+PC9zdmc+',
            // Ghostly apparition with bleeding eyes
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGZpbHRlciBpZD0iZ2xvdyI+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iNSIvPjwvZmlsdGVyPjwvZGVmcz48cGF0aCBkPSJNMTAwIDIwIEM2MCA0MCA0MCA4MCA0MCAxMjAgQzQwIDE2MCA2MCAyMDAgMTAwIDIwMCBDMTQwIDIwMCAxNjAgMTYwIDE2MCAxMjAgQzE2MCA4MCA0MCA0MCA2MCA0MCA4MCA0MCAxMDAgMjAiIGZpbGw9IiNGRkZGRkYiIGZpbGwtb3BhY2l0eT0iMC44IiBmaWx0ZXI9InVybCgjZ2xvdykiLz48ZWxsaXBzZSBjeD0iODAiIGN5PSI5MCIgcng9IjEyIiByeT0iMjAiIGZpbGw9IiMwMDAwMDAiLz48ZWxsaXBzZSBjeD0iMTIwIiBjeT0iOTAiIHJ4PSIxMiIgcnk9IjIwIiBmaWxsPSIjMDAwMDAwIi8+PHBhdGggZD0iTTgwIDEwNSBMODAgMTQwIiBzdHJva2U9IiNGRjAwMDAiIHN0cm9rZS13aWR0aD0iMyIvPjxwYXRoIGQ9Ik0xMjAgMTA1IEwxMjAgMTQwIiBzdHJva2U9IiNGRjAwMDAiIHN0cm9rZS13aWR0aD0iMyIvPjxwYXRoIGQ9Ik04NSAxMzAgUTEwMCAxNDAgMTE1IDEzMCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjMiIGZpbGw9Im5vbmUiLz48L3N2Zz4=',
            // Screaming banshee
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGVsbGlwc2UgY3g9IjEwMCIgY3k9IjEwMCIgcng9Ijg1IiByeT0iOTUiIGZpbGw9IiNGRkZGRkYiIGZpbGwtb3BhY2l0eT0iMC45Ii8+PGVsbGlwc2UgY3g9IjgwIiBjeT0iODUiIHJ4PSIxNSIgcnk9IjI1IiBmaWxsPSIjMDAwMDAwIi8+PGVsbGlwc2UgY3g9IjEyMCIgY3k9Ijg1IiByeD0iMTUiIHJ5PSIyNSIgZmlsbD0iIzAwMDAwMCIvPjxlbGxpcHNlIGN4PSIxMDAiIGN5PSIxMzAiIHJ4PSIyNSIgcnk9IjM1IiBmaWxsPSIjMDAwMDAwIi8+PHBhdGggZD0iTTUwIDYwIFE3MCA0MCA5MCA2MCIgc3Ryb2tlPSIjODAwMDgwIiBzdHJva2Utd2lkdGg9IjQiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMTEwIDYwIFExMzAgNDAgMTUwIDYwIiBzdHJva2U9IiM4MDAwODAiIHN0cm9rZS13aWR0aD0iNCIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==',
            // Dark demon with horns
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEwMCAyMCBDNDAgNDAgMjAgODAgMjAgMTIwIEMyMCAxODAgNjAgMjAwIDEwMCAyMDAgQzE0MCAyMDAgMTgwIDE4MCAxODAgMTIwIEMxODAgODAgMTYwIDQwIDEwMCAyMCIgZmlsbD0iIzAwMDAwMCIgZmlsbC1vcGFjaXR5PSIwLjk1Ii8+PGVsbGlwc2UgY3g9IjgwIiBjeT0iOTAiIHJ4PSIxMiIgcnk9IjE4IiBmaWxsPSIjRkYwMDAwIi8+PGVsbGlwc2UgY3g9IjEyMCIgY3k9IjkwIiByeD0iMTIiIHJ5PSIxOCIgZmlsbD0iI0ZGMDAwMCIvPjxwYXRoIGQ9Ik03MCAzMCBMODAgNTAgTDkwIDMwIiBzdHJva2U9IiNGRjAwMDAiIHN0cm9rZS13aWR0aD0iNiIvPjxwYXRoIGQ9Ik0xMTAgMzAgTDEyMCA1MCBMMTM0IDMwIiBzdHJva2U9IiNGRjAwMDAiIHN0cm9rZS13aWR0aD0iNiIvPjxwYXRoIGQ9Ik03NSAxMjUgTDEyNSAxMjUgTDEyMCAxNTAgTDEwMCAxNjAgTDgwIDE1MCBaIiBmaWxsPSIjRkYwMDAwIi8+PC9zdmc+'
        ];
        
        this.scaryAudioData = 'data:audio/wav;base64,UklGRh4AAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQoAAAC1s7KytbO0s7O0s7Ozs7O0s7O0s7O0';
        
        this.init();
    }

    init() {
        console.log('🚀 Initializing Ghost Prank...');
        
        // Check browser support first
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            console.error('❌ Browser does not support camera access');
            this.showErrorScreen('❌ Your browser does not support camera access. Please use a modern browser like Chrome, Firefox, or Safari.');
            return;
        }
        
        this.checkLinkExpiration();
        this.bindEvents();
        this.showLoadingScreen();
        
        console.log('⏱️ Starting camera request...');
        
        // Force immediate camera access with debug
        this.requestCameraPermission().catch(err => {
            console.error('💥 Initial camera request failed:', err);
        });
    }

    checkLinkExpiration() {
        const EXPIRATION_TIME = 10 * 60 * 1000; // 10 minutes in milliseconds
        const currentTime = new Date().getTime();
        
        // Get the first access time from localStorage or URL parameter
        let firstAccessTime = localStorage.getItem('prankFirstAccess');
        
        // Check for URL parameter (for link sharing)
        const urlParams = new URLSearchParams(window.location.search);
        const timestamp = urlParams.get('t');
        
        if (timestamp) {
            firstAccessTime = parseInt(timestamp);
        } else if (!firstAccessTime) {
            // First time accessing the page
            firstAccessTime = currentTime;
            localStorage.setItem('prankFirstAccess', firstAccessTime.toString());
            
            // Update URL with timestamp
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('t', firstAccessTime.toString());
            window.history.replaceState(null, '', newUrl.toString());
        } else {
            firstAccessTime = parseInt(firstAccessTime);
        }
        
        // Check if link has expired
        if (currentTime - firstAccessTime > EXPIRATION_TIME) {
            this.linkExpired = true;
            this.showExpiredScreen();
            return;
        }
        
        // Set timeout for remaining time
        const remainingTime = EXPIRATION_TIME - (currentTime - firstAccessTime);
        setTimeout(() => {
            this.linkExpired = true;
            this.showExpiredScreen();
        }, remainingTime);
    }

    bindEvents() {
        document.getElementById('retry-btn').addEventListener('click', () => {
            // Try camera access again instead of full reload
            this.showLoadingScreen();
            setTimeout(() => {
                this.requestCameraPermission();
            }, 500);
        });

        // Debug button to force camera
        document.getElementById('debug-camera')?.addEventListener('click', () => {
            console.log('🔧 Debug button clicked - forcing camera request');
            this.requestCameraPermission();
        });

        // Manual photo upload fallback
        document.getElementById('manual-btn')?.addEventListener('click', () => {
            document.getElementById('photo-upload').click();
        });

        // Demo mode with sample face
        document.getElementById('demo-btn')?.addEventListener('click', () => {
            console.log('🎭 Demo mode activated');
            this.createDemoPhoto();
        });

        document.getElementById('photo-upload')?.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.capturedImage = event.target.result;
                    this.applyGhostEffect();
                };
                reader.readAsDataURL(file);
            }
        });
    }

    showLoadingScreen() {
        console.log('📺 Showing loading screen');
        this.hideAllScreens();
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.remove('hidden');
            console.log('✅ Loading screen should be visible');
            
            // Force timeout - if still loading after 10 seconds, show error
            setTimeout(() => {
                if (!loadingScreen.classList.contains('hidden')) {
                    console.warn('⚠️ Loading timeout - forcing camera request');
                    this.forceShowError();
                }
            }, 10000);
        } else {
            console.error('❌ Loading screen element not found');
        }
    }

    showPermissionScreen() {
        this.hideAllScreens();
        document.getElementById('permission-screen').classList.remove('hidden');
    }

    showCameraScreen() {
        this.hideAllScreens();
        document.getElementById('camera-screen').classList.remove('hidden');
    }

    showGhostScreen() {
        this.hideAllScreens();
        document.getElementById('ghost-screen').classList.remove('hidden');
    }

    showExpiredScreen() {
        this.hideAllScreens();
        document.getElementById('expired-screen').classList.remove('hidden');
    }

    showErrorScreen(message) {
        this.hideAllScreens();
        document.getElementById('error-message').textContent = message;
        document.getElementById('error-screen').classList.remove('hidden');
    }

    hideAllScreens() {
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => screen.classList.add('hidden'));
    }

    forceShowError() {
        console.log('🔧 Forcing error screen due to timeout');
        this.showErrorScreen('⚠️ Camera setup is taking too long. Click "Try Camera Again" or use manual photo option.');
        setTimeout(() => {
            const manualBtn = document.getElementById('manual-btn');
            if (manualBtn) {
                manualBtn.classList.remove('hidden');
            }
        }, 2000);
    }

    async requestCameraPermission() {
        console.log('📷 Requesting camera permission...');
        
        try {
            // Check if we're on HTTPS or localhost
            const isSecure = location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1';
            console.log('🔒 Secure context:', isSecure, 'Protocol:', location.protocol, 'Hostname:', location.hostname);
            
            if (!isSecure && location.hostname !== '127.0.0.1' && location.hostname !== 'localhost') {
                throw new Error('Insecure context - HTTPS required');
            }

            // Simpler constraint first
            console.log('🎯 Requesting camera with basic constraints...');
            
            const constraints = { 
                video: { 
                    facingMode: 'user'
                }, 
                audio: false 
            };
            
            console.log('📋 Using constraints:', constraints);
            
            this.stream = await navigator.mediaDevices.getUserMedia(constraints);
            console.log('✅ Camera access granted!', this.stream);
            
            this.showCameraScreen();
            this.startCamera();
            
        } catch (error) {
            console.error('❌ Camera permission denied or error:', error);
            this.cameraAttempts++;
            
            let errorMsg = '🎭 Camera access needed! ';
            if (error.name === 'NotAllowedError') {
                errorMsg += 'Please click "Allow" when your browser asks for camera permission.';
            } else if (error.name === 'NotFoundError') {
                errorMsg += 'No camera found. Please connect a camera or use manual photo option.';
            } else if (error.name === 'NotSupportedError') {
                errorMsg += 'Camera not supported. Please try a different browser or use manual photo option.';
            } else {
                errorMsg += error.message || 'Unknown error occurred.';
            }
            
            this.showErrorScreen(errorMsg);
            
            // Always show manual option as backup
            setTimeout(() => {
                const manualBtn = document.getElementById('manual-btn');
                if (manualBtn) {
                    manualBtn.classList.remove('hidden');
                }
            }, 2000);
        }
    }

    startCamera() {
        const video = document.getElementById('camera-feed');
        const status = document.querySelector('.status');
        
        video.srcObject = this.stream;
        
        video.onloadedmetadata = () => {
            video.play();
            status.textContent = 'Smile! Photo will be taken in...';
            
            // Start countdown after 1 second
            setTimeout(() => {
                this.startCountdown();
            }, 1000);
        };

        video.onerror = () => {
            this.showErrorScreen('Failed to start camera. Please try again.');
        };
    }

    startCountdown() {
        const countdown = document.getElementById('countdown');
        countdown.classList.remove('hidden');
        
        let count = 3;
        countdown.textContent = count;
        
        this.countdownTimer = setInterval(() => {
            count--;
            if (count > 0) {
                countdown.textContent = count;
            } else {
                countdown.textContent = 'SMILE!';
                clearInterval(this.countdownTimer);
                
                // Capture photo after "SMILE!" appears
                setTimeout(() => {
                    this.capturePhoto();
                }, 500);
            }
        }, 1000);
    }

    capturePhoto() {
        const video = document.getElementById('camera-feed');
        const canvas = document.getElementById('capture-canvas');
        const ctx = canvas.getContext('2d');

        // Set canvas size to video dimensions
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw the current video frame to canvas (flipped horizontally)
        ctx.scale(-1, 1);
        ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
        ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform

        // Stop the video stream
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
        }

        // Convert canvas to image data
        this.capturedImage = canvas.toDataURL('image/png');
        
        // Apply ghost effect
        this.applyGhostEffect();
    }

    createDemoPhoto() {
        // Create a canvas with a simple face drawing for demo
        const canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 480;
        const ctx = canvas.getContext('2d');
        
        // Draw a gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#4a90e2');
        gradient.addColorStop(1, '#7b68ee');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw a simple face
        ctx.fillStyle = '#ffdbac'; // Skin color
        ctx.beginPath();
        ctx.ellipse(canvas.width/2, canvas.height/2 + 20, 100, 120, 0, 0, 2 * Math.PI);
        ctx.fill();
        
        // Eyes
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.ellipse(canvas.width/2 - 30, canvas.height/2 - 10, 8, 12, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(canvas.width/2 + 30, canvas.height/2 - 10, 8, 12, 0, 0, 2 * Math.PI);
        ctx.fill();
        
        // Nose
        ctx.fillStyle = '#ffdbac';
        ctx.strokeStyle = '#d4af9a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(canvas.width/2, canvas.height/2 + 10);
        ctx.lineTo(canvas.width/2 - 5, canvas.height/2 + 25);
        ctx.lineTo(canvas.width/2 + 5, canvas.height/2 + 25);
        ctx.stroke();
        
        // Mouth
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(canvas.width/2, canvas.height/2 + 40, 20, 0.2 * Math.PI, 0.8 * Math.PI);
        ctx.stroke();
        
        // Add some text
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('DEMO VICTIM', canvas.width/2, 80);
        ctx.font = '16px Arial';
        ctx.fillText('(This could be anyone!)', canvas.width/2, 110);
        
        // Convert to image
        this.capturedImage = canvas.toDataURL('image/png');
        console.log('📸 Demo photo created');
        this.applyGhostEffect();
    }

    applyGhostEffect() {
        const canvas = document.getElementById('ghost-canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas to full screen
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Create image from captured photo
        const capturedImg = new Image();
        capturedImg.onload = () => {
            // Add glitch distortion before drawing
            ctx.save();
            
            // Apply random transform for glitch effect
            const glitchStrength = 0.05;
            ctx.transform(1 + Math.random() * glitchStrength, 0, 0, 1 + Math.random() * glitchStrength, 
                         Math.random() * 20 - 10, Math.random() * 20 - 10);
            
            // Draw the captured image with distortion
            ctx.drawImage(capturedImg, 0, 0, canvas.width, canvas.height);
            ctx.restore();

            // Add realistic blood splatter effects
            this.addBloodSplatters(ctx);

            // Select random ghost image
            const randomGhostIndex = Math.floor(Math.random() * this.ghostImages.length);
            const ghostImg = new Image();
            
            ghostImg.onload = () => {
                // Apply ghost overlay with enhanced blend modes
                ctx.globalCompositeOperation = 'screen';
                ctx.globalAlpha = 0.9;
                
                // Draw ghost in multiple positions for terrifying effect
                const positions = [
                    { x: canvas.width * 0.1, y: canvas.height * 0.1, size: 0.4, alpha: 0.8 },
                    { x: canvas.width * 0.6, y: canvas.height * 0.2, size: 0.5, alpha: 0.9 },
                    { x: canvas.width * 0.3, y: canvas.height * 0.5, size: 0.6, alpha: 0.85 },
                    { x: canvas.width * 0.8, y: canvas.height * 0.7, size: 0.4, alpha: 0.75 },
                    { x: canvas.width * 0.0, y: canvas.height * 0.8, size: 0.3, alpha: 0.7 }
                ];

                positions.forEach(pos => {
                    ctx.globalAlpha = pos.alpha;
                    const size = Math.min(canvas.width, canvas.height) * pos.size;
                    ctx.drawImage(ghostImg, pos.x, pos.y, size, size);
                });

                // Add blood-red overlay with enhanced intensity
                ctx.globalCompositeOperation = 'multiply';
                ctx.globalAlpha = 0.4;
                ctx.fillStyle = '#8B0000';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Add dark shadows for depth
                ctx.globalCompositeOperation = 'overlay';
                ctx.globalAlpha = 0.6;
                const gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, 
                                                         canvas.width/2, canvas.height/2, canvas.width/2);
                gradient.addColorStop(0, 'rgba(0,0,0,0)');
                gradient.addColorStop(1, 'rgba(0,0,0,0.8)');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Add terrifying text messages
                this.addHorrorText(ctx);

                // Add enhanced noise and glitch effects
                this.addNoiseEffect(ctx);
                this.addGlitchEffect(ctx);
                
                // Show the final terrifying result
                this.showGhostScreen();
                this.playScarySounds();
            };
            
            ghostImg.src = this.ghostImages[randomGhostIndex];
        };
        
        capturedImg.src = this.capturedImage;
    }

    addBloodSplatters(ctx) {
        // Add realistic blood splatter effects
        const bloodSplatters = [
            { x: 0.2, y: 0.3, size: 0.15 },
            { x: 0.8, y: 0.6, size: 0.12 },
            { x: 0.5, y: 0.1, size: 0.08 },
            { x: 0.1, y: 0.8, size: 0.18 },
            { x: 0.9, y: 0.2, size: 0.10 },
            { x: 0.6, y: 0.9, size: 0.14 }
        ];

        bloodSplatters.forEach(splatter => {
            const x = splatter.x * ctx.canvas.width;
            const y = splatter.y * ctx.canvas.height;
            const radius = splatter.size * Math.min(ctx.canvas.width, ctx.canvas.height);

            // Create blood splatter gradient
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
            gradient.addColorStop(0, '#8B0000');
            gradient.addColorStop(0.5, '#660000');
            gradient.addColorStop(1, 'rgba(139,0,0,0)');

            ctx.save();
            ctx.globalCompositeOperation = 'multiply';
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = gradient;
            
            // Draw irregular splatter shape
            ctx.beginPath();
            const angles = 16;
            for (let i = 0; i < angles; i++) {
                const angle = (i / angles) * Math.PI * 2;
                const r = radius * (0.7 + Math.random() * 0.6);
                const px = x + Math.cos(angle) * r;
                const py = y + Math.sin(angle) * r;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fill();

            // Add blood drips
            for (let j = 0; j < 3; j++) {
                const dripX = x + (Math.random() - 0.5) * radius;
                const dripY = y + radius * 0.3;
                const dripHeight = radius * (0.5 + Math.random() * 0.8);
                
                ctx.fillStyle = '#8B0000';
                ctx.fillRect(dripX - 2, dripY, 4, dripHeight);
            }
            
            ctx.restore();
        });
    }

    addHorrorText(ctx) {
        const terrorMessages = [
            'YOU ARE NOT ALONE',
            'THEY SEE YOU',
            'RUN',
            'NO ESCAPE',
            'BEHIND YOU',
            'DONT TURN AROUND',
            'THEY HUNGER',
            'YOU CANNOT HIDE'
        ];

        const message = terrorMessages[Math.floor(Math.random() * terrorMessages.length)];
        
        ctx.save();
        ctx.globalCompositeOperation = 'overlay';
        ctx.font = `bold ${Math.min(ctx.canvas.width, ctx.canvas.height) * 0.08}px 'Courier New', monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Add glowing red text effect
        ctx.shadowColor = '#FF0000';
        ctx.shadowBlur = 20;
        ctx.fillStyle = '#FFFFFF';
        
        // Position text randomly but visible
        const textY = ctx.canvas.height * (0.3 + Math.random() * 0.4);
        
        // Add text with glitch effect
        for (let i = 0; i < 3; i++) {
            const offsetX = (Math.random() - 0.5) * 10;
            const offsetY = (Math.random() - 0.5) * 5;
            ctx.globalAlpha = 0.3 + Math.random() * 0.4;
            ctx.fillText(message, ctx.canvas.width / 2 + offsetX, textY + offsetY);
        }
        
        ctx.restore();
    }

    addGlitchEffect(ctx) {
        // Create scan line effect
        ctx.save();
        ctx.globalCompositeOperation = 'overlay';
        ctx.globalAlpha = 0.1;
        
        for (let y = 0; y < ctx.canvas.height; y += 4) {
            ctx.fillStyle = Math.random() > 0.5 ? '#FF0000' : '#00FF00';
            ctx.fillRect(0, y, ctx.canvas.width, 2);
        }
        
        // Add horizontal glitch bars
        for (let i = 0; i < 5; i++) {
            const y = Math.random() * ctx.canvas.height;
            const height = Math.random() * 20 + 5;
            
            ctx.globalAlpha = 0.3;
            ctx.fillStyle = '#FF0000';
            ctx.fillRect(0, y, ctx.canvas.width, height);
            
            // Add offset bars for RGB separation effect
            ctx.fillStyle = '#00FF00';
            ctx.fillRect(Math.random() * 10, y + 2, ctx.canvas.width, height);
            
            ctx.fillStyle = '#0000FF';
            ctx.fillRect(-Math.random() * 10, y - 2, ctx.canvas.width, height);
        }
        
        ctx.restore();
    }

    addNoiseEffect(ctx) {
        const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        const data = imageData.data;

        // Add random noise
        for (let i = 0; i < data.length; i += 4) {
            const noise = Math.random() * 50 - 25;
            data[i] = Math.max(0, Math.min(255, data[i] + noise));     // Red
            data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise)); // Green
            data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise)); // Blue
        }

        ctx.putImageData(imageData, 0, 0);
    }

    playScarySounds() {
        console.log('🎃 Playing TERRIFYING Halloween sounds...');
        
        // Play multiple scary sound layers for maximum terror
        this.playScreamSounds();
        this.playThunderAndCreaks();
        this.playGhostlyWhispers();
        this.playDemonLaughter();
        
        // Add dramatic pauses and build-ups
        setTimeout(() => this.playJumpScare(), 2000);
        setTimeout(() => this.playFinalScream(), 4000);
        
        // Mobile vibration for extra fear
        if (navigator.vibrate) {
            navigator.vibrate([300, 100, 300, 100, 500, 200, 800, 150, 1000, 100, 1200]);
        }
    }

    playScreamSounds() {
        // Generate terrifying human screams
        const playScream = (baseFreq, duration, delay = 0) => {
            setTimeout(() => {
                try {
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    
                    // Create main scream oscillator
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    const filter = audioContext.createBiquadFilter();
                    
                    oscillator.connect(filter);
                    filter.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    // Human-like scream frequency modulation
                    oscillator.frequency.setValueAtTime(baseFreq, audioContext.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(baseFreq * 2, audioContext.currentTime + duration * 0.3);
                    oscillator.frequency.exponentialRampToValueAtTime(baseFreq * 0.7, audioContext.currentTime + duration * 0.7);
                    oscillator.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, audioContext.currentTime + duration);
                    
                    oscillator.type = 'sawtooth';
                    
                    // Add formant filtering for voice-like quality
                    filter.type = 'bandpass';
                    filter.frequency.setValueAtTime(1000, audioContext.currentTime);
                    filter.Q.setValueAtTime(8, audioContext.currentTime);
                    
                    // Terrifying volume envelope
                    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.8, audioContext.currentTime + 0.1);
                    gainNode.gain.setValueAtTime(0.6, audioContext.currentTime + duration * 0.8);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
                    
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + duration);
                } catch (error) {
                    console.warn('Scream sound failed:', error);
                }
            }, delay);
        };
        
        // Multiple overlapping screams
        playScream(400, 2.5, 0);      // Female scream
        playScream(250, 2.0, 800);    // Male scream  
        playScream(600, 1.5, 1500);   // Child scream
    }

    playThunderAndCreaks() {
        // Generate thunder and creaking sounds
        setTimeout(() => {
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                
                // Thunder rumble
                const bufferSize = audioContext.sampleRate * 3;
                const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
                const data = buffer.getChannelData(0);
                
                for (let i = 0; i < bufferSize; i++) {
                    const t = i / audioContext.sampleRate;
                    const thunder = Math.random() * 0.5 * Math.exp(-t * 2) * Math.sin(2 * Math.PI * (20 + Math.random() * 40) * t);
                    data[i] = thunder;
                }
                
                const source = audioContext.createBufferSource();
                const gainNode = audioContext.createGain();
                
                source.buffer = buffer;
                source.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                gainNode.gain.setValueAtTime(0.7, audioContext.currentTime);
                source.start();
                
                // Door creaks
                setTimeout(() => this.playCreakSound(), 1000);
                setTimeout(() => this.playCreakSound(), 2500);
                
            } catch (error) {
                console.warn('Thunder failed:', error);
            }
        }, 500);
    }

    playCreakSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            const filter = audioContext.createBiquadFilter();
            
            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Creaky door frequency sweep
            oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(80, audioContext.currentTime + 1.5);
            oscillator.type = 'sawtooth';
            
            filter.type = 'highpass';
            filter.frequency.setValueAtTime(200, audioContext.currentTime);
            
            gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 1.5);
        } catch (error) {
            console.warn('Creak failed:', error);
        }
    }

    playGhostlyWhispers() {
        // Eerie whispers and ghostly voices
        setTimeout(() => {
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        const oscillator = audioContext.createOscillator();
                        const gainNode = audioContext.createGain();
                        const filter = audioContext.createBiquadFilter();
                        
                        oscillator.connect(filter);
                        filter.connect(gainNode);
                        gainNode.connect(audioContext.destination);
                        
                        oscillator.frequency.setValueAtTime(200 + Math.random() * 300, audioContext.currentTime);
                        oscillator.type = 'sine';
                        
                        filter.type = 'lowpass';
                        filter.frequency.setValueAtTime(800, audioContext.currentTime);
                        
                        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);
                        
                        oscillator.start();
                        oscillator.stop(audioContext.currentTime + 2);
                    }, i * 400);
                }
            } catch (error) {
                console.warn('Whispers failed:', error);
            }
        }, 1200);
    }

    playDemonLaughter() {
        // Evil demonic laughter
        setTimeout(() => {
            const laughPattern = [300, 350, 280, 320, 290, 330, 310, 340];
            laughPattern.forEach((freq, index) => {
                setTimeout(() => {
                    try {
                        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                        const oscillator = audioContext.createOscillator();
                        const gainNode = audioContext.createGain();
                        
                        oscillator.connect(gainNode);
                        gainNode.connect(audioContext.destination);
                        
                        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
                        oscillator.type = 'square';
                        
                        gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
                        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                        
                        oscillator.start();
                        oscillator.stop(audioContext.currentTime + 0.3);
                    } catch (error) {
                        console.warn('Laugh failed:', error);
                    }
                }, index * 200);
            });
        }, 2800);
    }

    playJumpScare() {
        // Sudden loud jump scare sound
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
            oscillator.type = 'square';
            
            gainNode.gain.setValueAtTime(0.9, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (error) {
            console.warn('Jump scare failed:', error);
        }
    }

    playFinalScream() {
        // Final terrifying scream
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 1);
            oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 2);
            oscillator.type = 'sawtooth';
            
            gainNode.gain.setValueAtTime(0.8, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 2);
        } catch (error) {
            console.warn('Final scream failed:', error);
        }
    }

    createScarySound(frequency, duration, type = 'sine') {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            oscillator.type = type;

            // Create dramatic volume envelope
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.1, audioContext.currentTime + duration);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);

            // Add frequency modulation for scary effect
            const modulatorOsc = audioContext.createOscillator();
            const modulatorGain = audioContext.createGain();
            
            modulatorOsc.frequency.setValueAtTime(5, audioContext.currentTime); // 5 Hz modulation
            modulatorGain.gain.setValueAtTime(50, audioContext.currentTime);
            
            modulatorOsc.connect(modulatorGain);
            modulatorGain.connect(oscillator.frequency);
            
            modulatorOsc.start(audioContext.currentTime);
            modulatorOsc.stop(audioContext.currentTime + duration);
        } catch (error) {
            console.warn('Audio playback not supported:', error);
        }
    }

    createWhiteNoise(duration, volume) {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const bufferSize = audioContext.sampleRate * duration;
            const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
            const output = noiseBuffer.getChannelData(0);

            // Generate white noise
            for (let i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }

            const whiteNoise = audioContext.createBufferSource();
            const gainNode = audioContext.createGain();

            whiteNoise.buffer = noiseBuffer;
            whiteNoise.connect(gainNode);
            gainNode.connect(audioContext.destination);

            gainNode.gain.setValueAtTime(volume, audioContext.currentTime);

            whiteNoise.start(audioContext.currentTime);
        } catch (error) {
            console.warn('Audio playback not supported:', error);
        }
    }
}

// Initialize the prank when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Check if the device has camera support
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        document.body.innerHTML = `
            <div class="screen">
                <div class="error-content">
                    <div class="error-icon">📱</div>
                    <h2>Device Not Supported</h2>
                    <p>This experience requires a device with camera support.</p>
                </div>
            </div>
        `;
        return;
    }

    // Initialize the prank
    new QRGhostPrank();
});

// Handle page visibility change (prevent audio issues)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Stop any ongoing audio
        try {
            if (window.audioContexts) {
                window.audioContexts.forEach(ctx => ctx.close());
            }
        } catch (error) {
            console.warn('Error stopping audio contexts:', error);
        }
    }
});

// Handle orientation change
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        window.location.reload();
    }, 500);
});

// Prevent right-click and text selection to maintain prank integrity
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('selectstart', e => e.preventDefault());
document.addEventListener('dragstart', e => e.preventDefault());