class QRGhostPrank {
    constructor() {
        this.stream = null;
        this.capturedImage = null;
        this.linkExpired = false;
        this.countdownTimer = null;
        this.cameraAttempts = 0;
        this.ghostImages = [
            // ULTRA SCARY DARK ZOMBIE FACE - MAXIMUM HORROR!
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGZpbHRlciBpZD0iZ2xvdyI+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMyIvPjxmZU1lcmdlPjxmZU1lcmdlTm9kZS8+PGZlTWVyZ2VOb2RlIGluPSJTb3VyY2VHcmFwaGljIi8+PC9mZU1lcmdlPjwvZmlsdGVyPjwvZGVmcz48ZWxsaXBzZSBjeD0iMTUwIiBjeT0iMTgwIiByeD0iMTIwIiByeT0iMTMwIiBmaWxsPSIjMDkwOTA5IiBzdHJva2U9IiNGRjAwMDAiIHN0cm9rZS13aWR0aD0iOCIgZmlsdGVyPSJ1cmwoI2dsb3cpIi8+PGVsbGlwc2UgY3g9IjEyMCIgY3k9IjE0MCIgcng9IjIwIiByeT0iMzAiIGZpbGw9IiMwMDAwMDAiLz48ZWxsaXBzZSBjeD0iMTgwIiBjeT0iMTQwIiByeD0iMjAiIHJ5PSIzMCIgZmlsbD0iIzAwMDAwMCIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjEzNSIgcj0iNSIgZmlsbD0iI0ZGMDAwMCIvPjxjaXJjbGUgY3g9IjE4MCIgY3k9IjEzNSIgcj0iNSIgZmlsbD0iI0ZGMDAwMCIvPjxlbGxpcHNlIGN4PSIxNTAiIGN5PSIxOTAiIHJ4PSI0MCIgcnk9IjI1IiBmaWxsPSIjMDAwMDAwIi8+PHBhdGggZD0iTTEyMCAxOTAgTDE4MCAyMTAgTDE3MCAyMzAgTDEzMCAyMjUgWiIgZmlsbD0iIzMzMDAwMCIvPjxwYXRoIGQ9Ik0xMzAgMTkwIEwxNzAgMTkwIEwxNjUgMjEwIEwxMzUgMjEwIFoiIGZpbGw9IiM2NjAwMDAiLz48cGF0aCBkPSJNMTMwIDIwMCBMMTcwIDIwMCIgc3Ryb2tlPSIjRkYwMDAwIiBzdHJva2Utd2lkdGg9IjMiLz48cmVjdCB4PSIxMjgiIHk9IjE4NSIgd2lkdGg9IjgiIGhlaWdodD0iMjAiIGZpbGw9IiNGRkZGRkYiLz48cmVjdCB4PSIxNDUiIHk9IjE4NSIgd2lkdGg9IjgiIGhlaWdodD0iMjAiIGZpbGw9IiNGRkZGRkYiLz48cmVjdCB4PSIxNjIiIHk9IjE4NSIgd2lkdGg9IjgiIGhlaWdodD0iMjAiIGZpbGw9IiNGRkZGRkYiLz48cGF0aCBkPSJNMTEwIDEyMCBMMTIwIDEwMCBMMTMwIDEyMCIgZmlsbD0iI0ZGMDAwMCIvPjxwYXRoIGQ9Ik0xNzAgMTIwIEwxODAgMTAwIEwxOTAgMTIwIiBmaWxsPSIjRkYwMDAwIi8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTcwIiByPSI4IiBmaWxsPSIjRkYwMDAwIi8+PGNpcmNsZSBjeD0iMjAwIiBjeT0iMTcwIiByPSI4IiBmaWxsPSIjRkYwMDAwIi8+PGNpcmNsZSBjeD0iMTMwIiBjeT0iMjQwIiByPSI2IiBmaWxsPSIjRkYwMDAwIi8+PGNpcmNsZSBjeD0iMTcwIiBjeT0iMjQwIiByPSI2IiBmaWxsPSIjRkYwMDAwIi8+PC9zdmc+',
            // ROTTING SKULL WITH BLOOD DRIPS
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjI4MCIgdmlld0JveD0iMCAwIDI4MCAyODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJibG9vZCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM4ODAwMDAiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNGRjAwMDAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48ZWxsaXBzZSBjeD0iMTQwIiBjeT0iMTUwIiByeD0iMTAwIiByeT0iMTEwIiBmaWxsPSIjMTIxMjEyIiBzdHJva2U9IiM2NjAwMDAiIHN0cm9rZS13aWR0aD0iNiIvPjxlbGxpcHNlIGN4PSIxMTAiIGN5PSIxMjAiIHJ4PSIyNSIgcnk9IjM1IiBmaWxsPSIjMDAwMDAwIi8+PGVsbGlwc2UgY3g9IjE3MCIgY3k9IjEyMCIgcng9IjI1IiByeT0iMzUiIGZpbGw9IiMwMDAwMDAiLz48Y2lyY2xlIGN4PSIxMTAiIGN5PSIxMTAiIHI9IjgiIGZpbGw9IiNGRjAwMDAiLz48Y2lyY2xlIGN4PSIxNzAiIGN5PSIxMTAiIHI9IjgiIGZpbGw9IiNGRjAwMDAiLz48cG9seWdvbiBwb2ludHM9IjEzMCwxNjAgMTUwLDE2MCA1MCwxODAiIGZpbGw9IiMwMDAwMDAiLz48cGF0aCBkPSJNMTIwIDE4MCBMMTYwIDE4MCBMMTU1IDIwNSBMMTI1IDIwNSBaIiBmaWxsPSIjMDAwMDAwIi8+PGNpcmNsZSBjeD0iMTMwIiBjeT0iMTkwIiByPSI1IiBmaWxsPSIjRkZGRkZGIi8+PGNpcmNsZSBjeD0iMTUwIiBjeT0iMTkwIiByPSI1IiBmaWxsPSIjRkZGRkZGIi8+PHBhdGggZD0iTTEwMCAxMDAgTDEwMCAyNDAiIHN0cm9rZT0idXJsKCNibG9vZCkiIHN0cm9rZS13aWR0aD0iOCIvPjxwYXRoIGQ9Ik0xODAgMTAwIEwxODAgMjQwIiBzdHJva2U9InVybCgjYmxvb2QpIiBzdHJva2Utd2lkdGg9IjgiLz48cGF0aCBkPSJNMTQwIDgwIEwxNDAgMjUwIiBzdHJva2U9InVybCgjYmxvb2QpIiBzdHJva2Utd2lkdGg9IjEyIi8+PGNpcmNsZSBjeD0iODAiIGN5PSIxNDAiIHI9IjEwIiBmaWxsPSIjRkYwMDAwIi8+PGNpcmNsZSBjeD0iMjAwIiBjeT0iMTQwIiByPSIxMCIgZmlsbD0iI0ZGMDAwMCIvPjwvc3ZnPg==',
            // NIGHTMARE DEMON FACE
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgdmlld0JveD0iMCAwIDMyMCAzMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGZpbHRlciBpZD0iZGFyayI+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iNSIvPjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMC4zIDAgMCAwIDAgMCAwLjEgMCAwIDAgMCAwIDAuMSAwIDAgMCAwIDAgMSAwIi8+PC9maWx0ZXI+PC9kZWZzPjxlbGxpcHNlIGN4PSIxNjAiIGN5PSIxODAiIHJ4PSIxMzAiIHJ5PSIxNDAiIGZpbGw9IiMwNTA1MDUiIHN0cm9rZT0iIzc3MDAwMCIgc3Ryb2tlLXdpZHRoPSIxMCIgZmlsdGVyPSJ1cmwoI2RhcmspIi8+PHBhdGggZD0iTTEwMCAxMDAgTDE0MCA4MCAMMTgwIDEwMCBMMTQwIDEyMCBaIiBmaWxsPSIjRkYwMDAwIi8+PHBhdGggZD0iTTEyMCAxNDAgTDE0MCA5MCAVFTAAITc4MCIgZmlsbD0iIzMzMDAwMCIvPjxwYXRoIGQ9Ik0yMDAgMTQwIEwxODAgOTAgTDE2MCAxNDAiIGZpbGw9IiMzMzAwMDAiLz48ZWxsaXBzZSBjeD0iMTMwIiBjeT0iMTUwIiByeD0iMjAiIHJ5PSI0MCIgZmlsbD0iIzAwMDAwMCIvPjxlbGxpcHNlIGN4PSIxOTAiIGN5PSIxNTAiIHJ4PSIyMCIgcnk9IjQwIiBmaWxsPSIjMDAwMDAwIi8+PGNpcmNsZSBjeD0iMTMwIiBjeT0iMTQwIiByPSIxMCIgZmlsbD0iI0ZGMDAwMCIvPjxjaXJjbGUgY3g9IjE5MCIgY3k9IjE0MCIgcj0iMTAiIGZpbGw9IiNGRjAwMDAiLz48cG9seWdvbiBwb2ludHM9IjE0MCwyMDAgMTgwLDIwMCAxNzAsMjQwIDE1MCwyNDAiIGZpbGw9IiMwMDAwMDAiLz48cGF0aCBkPSJNMTMwIDIxMCBMMTkwIDIxMCBMMTg1IDIzNSBMMTM1IDIzNSBaIiBmaWxsPSIjNDQwMDAwIi8+PHJlY3QgeD0iMTM1IiB5PSIyMDUiIHdpZHRoPSIxMCIgaGVpZ2h0PSIyNSIgZmlsbD0iI0ZGRkZGRiIvPjxyZWN0IHg9IjE1NSIgeT0iMjA1IiB3aWR0aD0iMTAiIGhlaWdodD0iMjUiIGZpbGw9IiNGRkZGRkYiLz48cmVjdCB4PSIxNzUiIHk9IjIwNSIgd2lkdGg9IjEwIiBoZWlnaHQ9IjI1IiBmaWxsPSIjRkZGRkZGIi8+PHBhdGggZD0iTTcwIDIwMCBMMzAwIDIwMCIgc3Ryb2tlPSIjRkYwMDAwIiBzdHJva2Utd2lkdGg9IjE1Ii8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMjIwIiByPSIxMiIgZmlsbD0iI0ZGMDAwMCIvPjxjaXJjbGUgY3g9IjIyMCIgY3k9IjIyMCIgcj0iMTIiIGZpbGw9IiNGRjAwMDAiLz48L3N2Zz4=',
            // TERRIFYING GHOST WITH BLOOD TEARS
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYwIiBoZWlnaHQ9IjI2MCIgdmlld0JveD0iMCAwIDI2MCAyNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJkYXJrIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzIwMjAyMCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzAwMDAwMCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxwYXRoIGQ9Ik0xMzAgMzAgQzE4MCA1MCA0MCA4MCA0MCAxNDAgQzQwIDE4MCA2MCAyNTAgMTMwIDI1MCBDMjAwIDI1MCAyMjAgMTgwIDIyMCAxNDAgQzIyMCA4MCA4MCA1MCAxMzAgMzAiIGZpbGw9InVybCgjZGFyaykiIHN0cm9rZT0iIzU1MDAwMCIgc3Ryb2tlLXdpZHRoPSI4Ii8+PGVsbGlwc2UgY3g9IjEwMCIgY3k9IjEyMCIgcng9IjI1IiByeT0iMzUiIGZpbGw9IiMwMDAwMDAiLz48ZWxsaXBzZSBjeD0iMTYwIiBjeT0iMTIwIiByeD0iMjUiIHJ5PSIzNSIgZmlsbD0iIzAwMDAwMCIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjExMCIgcj0iMTIiIGZpbGw9IiNGRjAwMDAiLz48Y2lyY2xlIGN4PSIxNjAiIGN5PSIxMTAiIHI9IjEyIiBmaWxsPSIjRkYwMDAwIi8+PHBhdGggZD0iTTEwMCAxNDAgTDEwMCAxOTAiIHN0cm9rZT0iI0ZGMDAwMCIgc3Ryb2tlLXdpZHRoPSI2Ii8+PHBhdGggZD0iTTE2MCAxNDAgTDE2MCAMTkwIiBzdHJva2U9IiNGRjAwMDAiIHN0cm9rZS13aWR0aD0iNiIvPjxlbGxpcHNlIGN4PSIxMzAiIGN5PSIxODAiIHJ4PSI0MCIgcnk9IjMwIiBmaWxsPSIjMDAwMDAwIi8+PHBhdGggZD0iTTEwNSAxNzAgTDE1NSAxNzAgTDE1MCAyMDAgTDExMCAyMDAiIGZpbGw9IiM5OTAwMDAiLz48cG9seWdvbiBwb2ludHM9IjExNSwxNzUgMTQ1LDE3NSAxNDAsMTk1IDEyMCwxOTUiIGZpbGw9IiNGRjAwMDAiLz48Y2lyY2xlIGN4PSIxMjAiIGN5PSIxODAiIHI9IjQiIGZpbGw9IiNGRkZGRkYiLz48Y2lyY2xlIGN4PSIxNDAiIGN5PSIxODAiIHI9IjQiIGZpbGw9IiNGRkZGRkYiLz48Y2lyY2xlIGN4PSIzMCIgY3k9IjEzMCIgcj0iMTUiIGZpbGw9IiNGRjAwMDAiLz48Y2lyY2xlIGN4PSIyMzAiIGN5PSIxMzAiIHI9IjE1IiBmaWxsPSIjRkYwMDAwIi8+PC9zdmc+'
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
        
        // No expiry - QR code works forever for unlimited users
        console.log('🎃 QR Ghost Prank ready - No expiry, unlimited users!');
        this.bindEvents();
        this.showLoadingScreen();
        
        console.log('⏱️ Starting camera request...');
        
        // Force immediate camera access with debug
        this.requestCameraPermission().catch(err => {
            console.error('💥 Initial camera request failed:', err);
        });
    }

    checkLinkExpiration() {
        // DISABLED: No expiry system - QR code works forever!
        console.log('✅ Static QR: No expiry, works for unlimited users forever!');
        return; // Exit early - no expiry checks
        
        /* ORIGINAL EXPIRY CODE DISABLED:
        /* ORIGINAL EXPIRY CODE DISABLED:
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
        */
    }

    bindEvents() {
        // Force enable audio immediately (no user interaction required)
        this.forceEnableAudio();
        
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
        
        let count = 2;  // Reduced from 3 to 2
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

        // Hide countdown screen first
        document.getElementById('countdown').classList.add('hidden');

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
        console.log('🎭 Applying ghost effect...');
        const canvas = document.getElementById('ghost-canvas');
        const ctx = canvas.getContext('2d');
        
        if (!canvas || !ctx) {
            console.error('❌ Ghost canvas not found!');
            return;
        }
        
        // Set canvas to full screen
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        console.log('📐 Canvas size:', canvas.width, 'x', canvas.height);

        // Create image from captured photo
        const capturedImg = new Image();
        capturedImg.onload = () => {
            // Draw the captured image to cover the entire canvas
            ctx.drawImage(capturedImg, 0, 0, canvas.width, canvas.height);

            // Select random ghost image
            const randomGhostIndex = 0; // Always use first ghost (zombie face)
            const ghostImg = new Image();
            
            ghostImg.onload = () => {
                console.log('👻 Ghost image loaded successfully!');
                // Apply ultra dark horror overlay effects
                ctx.globalCompositeOperation = 'multiply';
                ctx.globalAlpha = 0.9;
                
                // Draw massive scary ghost in multiple positions
                const positions = [
                    { x: canvas.width * 0.05, y: canvas.height * 0.05, size: 0.6 },
                    { x: canvas.width * 0.4, y: canvas.height * 0.1, size: 0.7 },
                    { x: canvas.width * 0.1, y: canvas.height * 0.4, size: 0.8 },
                    { x: canvas.width * 0.6, y: canvas.height * 0.5, size: 0.6 },
                    { x: canvas.width * 0.3, y: canvas.height * 0.7, size: 0.5 }
                ];

                positions.forEach(pos => {
                    const size = Math.min(canvas.width, canvas.height) * pos.size;
                    ctx.drawImage(ghostImg, pos.x, pos.y, size, size);
                });

                // Add ultra dark blood overlay
                ctx.globalCompositeOperation = 'multiply';
                ctx.globalAlpha = 0.7;
                ctx.fillStyle = '#330000';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Add intense red blood overlay
                ctx.globalCompositeOperation = 'overlay';
                ctx.globalAlpha = 0.8;
                ctx.fillStyle = '#ff0000';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Add dark vignette effect
                const vignette = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, canvas.width/2);
                vignette.addColorStop(0, 'rgba(0,0,0,0)');
                vignette.addColorStop(0.7, 'rgba(0,0,0,0.5)');
                vignette.addColorStop(1, 'rgba(0,0,0,0.9)');
                ctx.globalCompositeOperation = 'multiply';
                ctx.globalAlpha = 1;
                ctx.fillStyle = vignette;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Add noise effect
                this.addNoiseEffect(ctx);
                
                // Show the final result
                console.log('🎬 Showing ghost screen and playing sounds...');
                this.showGhostScreen();
                
                // Small delay to ensure ghost effect renders before audio
                setTimeout(() => {
                    console.log('🔊 STARTING AUDIO PLAYBACK NOW!');
                    this.playScarySounds();
                }, 200);
            };
            
            ghostImg.src = this.ghostImages[randomGhostIndex];
            console.log('🖼️ Loading ghost image:', ghostImg.src.substring(0, 50) + '...');
        };
        
        capturedImg.src = this.capturedImage;
    }

    addNoiseEffect(ctx) {
        // Create ultra dark horror noise effect
        const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        const data = imageData.data;

        // Add dark noise and blood effect
        for (let i = 0; i < data.length; i += 4) {
            const noise = (Math.random() - 0.5) * 120; // Increased noise intensity
            const bloodEffect = Math.random() > 0.7 ? 80 : 0; // Random blood pixels
            
            data[i] = Math.max(0, Math.min(255, data[i] + noise + bloodEffect)); // Red channel with blood
            data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise * 0.3)); // Green channel darkened
            data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise * 0.3)); // Blue channel darkened
            
            // Make image much darker overall
            data[i] = Math.floor(data[i] * 0.6); 
            data[i + 1] = Math.floor(data[i + 1] * 0.4);
            data[i + 2] = Math.floor(data[i + 2] * 0.4);
        }

        ctx.putImageData(imageData, 0, 0);
    }

    playScarySounds() {
        console.log('🧙‍♀️ Playing REAL WITCH GHOST SCARING AUDIO!');
        console.log('📊 Audio context available:', !!window.AudioContext || !!window.webkitAudioContext);
        
        // Try to play the witch audio first
        this.playWitchAudio();
        
        // Add synthetic sounds as enhancement/backup
        setTimeout(() => {
            this.createScarySound(200, 0.5, 'sine'); // Low ominous tone
            this.createScarySound(800, 0.3, 'sawtooth'); // Sharp screech
        }, 500);
        
        // Play static/white noise
        setTimeout(() => {
            this.createWhiteNoise(1, 0.4);
        }, 1000);
        
        // Add tremolo effect
        setTimeout(() => {
            this.createScarySound(300, 0.6, 'triangle');
        }, 1500);
    }

    playWitchAudio() {
        console.log('🎯 FORCING WITCH AUDIO TO PLAY!');
        
        // Method 1: Try preloaded element with force
        const witchAudio1 = document.getElementById('witch-audio');
        console.log('🎵 Found witch-audio element:', !!witchAudio1);
        if (witchAudio1) {
            try {
                witchAudio1.muted = false;
                witchAudio1.volume = 1.0;
                witchAudio1.currentTime = 0;
                console.log('🎯 Attempting to FORCE play witch audio...');
                
                // Try to play immediately
                const playPromise = witchAudio1.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        console.log('🧙‍♀️ SUCCESS! Witch audio playing from preloaded element!');
                    }).catch((error) => {
                        console.log('❌ Preloaded audio failed:', error.message);
                        this.playWitchAudioFallback();
                    });
                } else {
                    console.log('🧙‍♀️ Witch audio started (no promise returned)');
                }
            } catch (error) {
                console.log('❌ Audio element error:', error);
                this.playWitchAudioFallback();
            }
        } else {
            console.log('❌ No witch-audio element found!');
            this.playWitchAudioFallback();
        }
        
        // Method 2: Also try new Audio() simultaneously
        this.playWitchAudioFallback();
    }

    playWitchAudioFallback() {
        console.log('🔥 AGGRESSIVE WITCH AUDIO FALLBACK!');
        
        try {
            // Create multiple audio instances
            const witchAudio2 = new Audio('witch-scream.mp3');
            const witchAudio3 = new Audio('./witch-scream.mp3');
            
            [witchAudio2, witchAudio3].forEach((audio, index) => {
                try {
                    audio.volume = 1.0;
                    audio.muted = false;
                    audio.load();
                    
                    const playAttempt = audio.play();
                    if (playAttempt) {
                        playAttempt.then(() => {
                            console.log(`🧙‍♀️ SUCCESS! Witch audio ${index + 2} playing!`);
                        }).catch((error) => {
                            console.log(`❌ Audio ${index + 2} failed:`, error.message);
                        });
                    }
                } catch (error) {
                    console.log(`❌ Audio ${index + 2} error:`, error);
                }
            });
            
        } catch (error) {
            console.log('❌ All audio methods failed, using synthetic only');
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

    // Force audio to work without user interaction
    forceEnableAudio() {
        try {
            // Preload and prepare audio immediately
            const witchAudio = document.getElementById('witch-audio');
            if (witchAudio) {
                witchAudio.muted = false;
                witchAudio.volume = 0.9;
                witchAudio.loop = false;
                witchAudio.preload = 'auto';
                witchAudio.load();
                console.log('🎵 Audio element force-prepared!');
            }
            
            // Create audio context immediately
            if (window.AudioContext || window.webkitAudioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                console.log('📊 Audio context force-created!');
            }
        } catch (error) {
            console.log('⚠️ Audio force setup:', error);
        }
    }
}

// Initialize the app when page loads
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