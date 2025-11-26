class QRGhostPrank {
    constructor() {
        // Android and mobile detection
        this.isAndroid = /Android/i.test(navigator.userAgent);
        this.isMobile = /Mobi|Android/i.test(navigator.userAgent);
        this.audioContext = null;
        this.audioUnlocked = false;
        this.userInteracted = false;
        
        console.log('📱 Device detection:', {
            isAndroid: this.isAndroid,
            isMobile: this.isMobile,
            userAgent: navigator.userAgent
        });

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
        
        // Setup audio unlock for Android devices
        this.setupAudioUnlock();
        
        // No expiry - QR code works forever for unlimited users
        console.log('🎃 QR Ghost Prank ready - No expiry, unlimited users!');
        this.bindEvents();
        this.showLoadingScreen();
        
        console.log('⏱️ Starting camera request...');
        console.log('🔍 Browser info:', navigator.userAgent);
        console.log('📱 Media devices available:', !!navigator.mediaDevices);
        console.log('🎥 getUserMedia available:', !!navigator.mediaDevices?.getUserMedia);
        
        // Quick fallback - show demo option after 2 seconds if camera loading
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
                console.warn('⚡ Camera loading slow - offering demo mode');
                this.showErrorScreen('Camera taking time? Use Demo Mode for instant ghost effects!');
            }
        }, 2000);
        
        // Force immediate camera access with debug
        this.requestCameraPermission().catch(err => {
            console.error('💥 Initial camera request failed:', err);
            // Show demo option immediately if camera fails
            this.showErrorScreen('⚡ Camera failed! Use Demo Mode below for instant ghost effects!');
        });
        
        // Add super early timeout for impatient users (after just 800ms)
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
                console.log('⚡ Adding early escape option for impatient users...');
                this.addQuickDemoButton();
            }
        }, 800);
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

        // Debug button to force camera OR offer demo
        document.getElementById('debug-camera')?.addEventListener('click', () => {
            console.log('🔧 Debug button clicked - trying camera with quick fallback');
            // Try camera but with faster error handling
            this.requestCameraPermission().catch(() => {
                console.log('🎭 Camera failed, showing demo option');
                this.showErrorScreen('Camera not working! Use Demo Mode below or try: localhost:8000/demo.html');
            });
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

        document.getElementById('instant-demo')?.addEventListener('click', () => {
            console.log('⚡ User chose instant demo from loading screen');
            this.unlockAudio(); // Ensure audio is ready
            window.location.href = 'demo.html';
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
            
            // Ultra-fast timeout - if still loading after 1.5 seconds, show demo option
            setTimeout(() => {
                if (!loadingScreen.classList.contains('hidden')) {
                    console.warn('⚠️ Camera loading slow - showing demo option');
                    this.showErrorScreen('⚡ Camera taking too long? Try Demo Mode for instant ghost effects!');
                }
            }, 1500);
            
            // Add immediate demo option after just 500ms
            setTimeout(() => {
                if (!loadingScreen.classList.contains('hidden')) {
                    console.log('🎮 Adding quick demo option...');
                    this.addQuickDemoButton();
                }
            }, 500);
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

    setupAudioUnlock() {
        // Android requires user interaction to unlock audio
        console.log('🔊 Setting up audio unlock for Android compatibility...');
        
        const unlockEvents = ['touchstart', 'touchend', 'mousedown', 'keydown', 'click'];
        
        const unlockAudio = () => {
            if (!this.audioUnlocked) {
                console.log('🔓 Attempting to unlock audio for Android...');
                this.unlockAudio();
            }
        };

        unlockEvents.forEach(event => {
            document.addEventListener(event, unlockAudio, { once: true, passive: true });
        });
        
        // Also unlock when any button is clicked
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                this.unlockAudio();
            }
        });
    }

    async unlockAudio() {
        if (this.audioUnlocked) return;
        
        try {
            console.log('🎵 Unlocking audio context for Android...');
            
            // Create and resume AudioContext
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            
            if (this.audioContext.state === 'suspended') {
                await this.audioContext.resume();
                console.log('✅ AudioContext resumed for Android');
            }
            
            // Play a silent sound to unlock audio
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.001);
            
            this.audioUnlocked = true;
            this.userInteracted = true;
            
            console.log('🔊 Audio unlocked for Android! Ready for scary sounds.');
            
            // Pre-load audio elements after unlock
            this.preloadAudioAfterUnlock();
            
        } catch (error) {
            console.warn('⚠️ Audio unlock failed:', error);
        }
    }

    preloadAudioAfterUnlock() {
        const audioElement = document.getElementById('witch-audio');
        if (audioElement && this.isAndroid) {
            try {
                audioElement.load();
                audioElement.volume = 0.1;
                
                // Try to play and immediately pause to prime the element
                const playPromise = audioElement.play();
                if (playPromise) {
                    playPromise.then(() => {
                        audioElement.pause();
                        audioElement.currentTime = 0;
                        audioElement.volume = 0.8; // Reset to proper volume
                        console.log('✅ Android audio element primed');
                    }).catch(() => {
                        console.log('⚠️ Audio priming failed, will try on ghost reveal');
                    });
                }
            } catch (error) {
                console.log('⚠️ Audio preload after unlock failed:', error);
            }
        }
    }

    addQuickDemoButton() {
        // Add a floating quick demo button for impatient users
        if (document.getElementById('quick-demo-btn')) return; // Don't add multiple
        
        console.log('🎮 Adding quick demo button for impatient users...');
        
        const quickBtn = document.createElement('button');
        quickBtn.id = 'quick-demo-btn';
        quickBtn.innerHTML = '⚡ SKIP TO DEMO';
        quickBtn.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #ff6600, #ff3333);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            z-index: 1001;
            box-shadow: 0 4px 15px rgba(255,51,51,0.4);
            animation: pulse 1s infinite;
            backdrop-filter: blur(10px);
        `;
        
        // Add pulsing animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); box-shadow: 0 4px 15px rgba(255,51,51,0.4); }
                50% { transform: scale(1.05); box-shadow: 0 6px 20px rgba(255,51,51,0.6); }
                100% { transform: scale(1); box-shadow: 0 4px 15px rgba(255,51,51,0.4); }
            }
        `;
        document.head.appendChild(style);
        
        quickBtn.addEventListener('click', () => {
            console.log('⚡ User chose quick demo option!');
            this.unlockAudio(); // Ensure audio is ready
            window.location.href = 'demo.html';
        });
        
        document.body.appendChild(quickBtn);
        
        // Auto-remove after 10 seconds to avoid clutter
        setTimeout(() => {
            if (quickBtn && quickBtn.parentNode) {
                quickBtn.parentNode.removeChild(quickBtn);
            }
        }, 10000);
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
        
        // Browser and device detection
        console.log('🌐 Browser info:', {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            vendor: navigator.vendor,
            language: navigator.language
        });
        
        // Check media device support
        if (!navigator.mediaDevices) {
            console.error('❌ Navigator.mediaDevices not supported');
            throw new Error('MediaDevices not supported');
        }
        
        if (!navigator.mediaDevices.getUserMedia) {
            console.error('❌ getUserMedia not supported');
            throw new Error('getUserMedia not supported');
        }
        
        console.log('✅ Media device support confirmed');
        
        // Try to enumerate devices if available
        try {
            if (navigator.mediaDevices.enumerateDevices) {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = devices.filter(device => device.kind === 'videoinput');
                console.log('📹 Video devices found:', videoDevices.length);
                videoDevices.forEach((device, index) => {
                    console.log(`📹 Device ${index + 1}:`, {
                        label: device.label || 'Unknown device',
                        deviceId: device.deviceId ? device.deviceId.substring(0, 20) + '...' : 'No ID'
                    });
                });
            }
        } catch (enumError) {
            console.warn('⚠️ Could not enumerate devices:', enumError.message);
        }
        
        // Set a promise timeout to prevent hanging (reduced for faster experience)
        const timeout = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Camera request timeout')), 2000);
        });
        
        try {
            // Check if we're on HTTPS or localhost
            const isSecure = location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1';
            console.log('🔒 Secure context:', isSecure, 'Protocol:', location.protocol, 'Hostname:', location.hostname);
            
            if (!isSecure && location.hostname !== '127.0.0.1' && location.hostname !== 'localhost') {
                throw new Error('Insecure context - HTTPS required');
            }

            // Simpler constraint first with timeout
            console.log('🎯 Requesting camera with timeout...');
            
            const constraints = { 
                video: { 
                    facingMode: 'user'
                }, 
                audio: false 
            };
            
            console.log('📋 Using constraints:', constraints);
            
            // Race between camera request and timeout
            const cameraPromise = navigator.mediaDevices.getUserMedia(constraints);
            this.stream = await Promise.race([cameraPromise, timeout]);
            
            console.log('✅ Camera access granted!', this.stream);
            
            // Log detailed stream information
            if (this.stream) {
                console.log('📊 Stream details:', {
                    id: this.stream.id,
                    active: this.stream.active,
                    tracks: this.stream.getTracks().length
                });
                
                this.stream.getTracks().forEach((track, index) => {
                    console.log(`🎬 Track ${index + 1}:`, {
                        kind: track.kind,
                        label: track.label || 'Unlabeled',
                        enabled: track.enabled,
                        readyState: track.readyState,
                        settings: track.getSettings ? track.getSettings() : 'Settings not available'
                    });
                });
            }
            
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
        
        if (!video || !this.stream) {
            console.error('❌ Video element or stream not available');
            this.showErrorScreen('Camera setup failed. Use Demo Mode below!');
            return;
        }
        
        video.srcObject = this.stream;
        
        video.onloadedmetadata = () => {
            console.log('📹 Video metadata loaded:', video.videoWidth, 'x', video.videoHeight);
            video.play().then(() => {
                console.log('▶️ Video playing successfully');
                status.textContent = 'Smile! Photo will be taken in...';
                
                // Start countdown after video is confirmed playing
                setTimeout(() => {
                    this.startCountdown();
                }, 1000);
            }).catch(err => {
                console.error('❌ Video play failed:', err);
                this.showErrorScreen('Video playback failed. Use Demo Mode below!');
            });
        };

        video.onerror = (err) => {
            console.error('❌ Video error:', err);
            this.showErrorScreen('Camera failed. Use Demo Mode below!');
        };
        
        // Fallback timeout if video doesn't load (reduced to 3 seconds)
        setTimeout(() => {
            if (video.readyState === 0) {
                console.error('⏰ Video loading timeout');
                this.showErrorScreen('⚡ Camera timeout! Use Demo Mode for instant effects!');
            }
        }, 3000);
        
        // Add progressive timeout warnings
        setTimeout(() => {
            if (video.readyState === 0) {
                console.warn('⚠️ Video still loading after 1 second...');
                this.addQuickDemoButton();
            }
        }, 1000);
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

        console.log('📸 Attempting to capture photo...');
        
        if (!video || !canvas) {
            console.error('❌ Video or canvas element missing');
            this.showErrorScreen('Photo capture failed. Use Demo Mode below!');
            return;
        }

        // Hide countdown screen first
        document.getElementById('countdown').classList.add('hidden');

        // Get video dimensions with fallbacks
        let width = video.videoWidth || video.clientWidth || 640;
        let height = video.videoHeight || video.clientHeight || 480;
        
        console.log('📏 Video dimensions:', width, 'x', height);
        
        // Ensure we have valid dimensions
        if (width === 0 || height === 0) {
            console.warn('⚠️ Invalid video dimensions, using defaults');
            width = 640;
            height = 480;
        }

        // Set canvas size to video dimensions
        canvas.width = width;
        canvas.height = height;

        try {
            // Draw the current video frame to canvas (flipped horizontally for selfie effect)
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(video, -width, 0, width, height);
            ctx.restore();
            
            console.log('✅ Photo captured successfully');
        } catch (error) {
            console.error('❌ Error drawing to canvas:', error);
            // Fallback: try without flipping
            try {
                ctx.drawImage(video, 0, 0, width, height);
                console.log('✅ Photo captured without flip');
            } catch (fallbackError) {
                console.error('❌ Fallback capture failed:', fallbackError);
                this.showErrorScreen('Photo capture failed. Use Demo Mode below!');
                return;
            }
        }

        // Stop the video stream
        if (this.stream) {
            this.stream.getTracks().forEach(track => {
                track.stop();
                console.log('🛑 Camera track stopped');
            });
        }

        // Convert canvas to image data
        try {
            this.capturedImage = canvas.toDataURL('image/png');
            console.log('🖼️ Image data created successfully, length:', this.capturedImage.length);
            console.log('📊 Image data preview:', this.capturedImage.substring(0, 100) + '...');
            
            // Apply ghost effect immediately
            console.log('👻 Starting ghost effect application...');
            this.applyGhostEffect();
        } catch (error) {
            console.error('❌ Error converting to image:', error);
            this.showErrorScreen('Image processing failed. Use Demo Mode below!');
        }
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

            // RANDOM SCARY MASK SELECTION - Different scare every time!
            const randomMaskIndex = Math.floor(Math.random() * this.ghostImages.length);
            console.log(`🎭 RANDOM MASK: Using mask #${randomMaskIndex + 1} of ${this.ghostImages.length}`);
            const ghostImg = new Image();
            
            ghostImg.onload = () => {
                // Apply medium scary overlay effects
                ctx.globalCompositeOperation = 'overlay';
                ctx.globalAlpha = 0.7;  // Increased from 0.5 to medium level
                
                // Draw ghost in multiple positions for scary effect
                const positions = [
                    { x: canvas.width * 0.15, y: canvas.height * 0.15, size: 0.5 },  // Larger and more
                    { x: canvas.width * 0.6, y: canvas.height * 0.3, size: 0.6 },
                    { x: canvas.width * 0.25, y: canvas.height * 0.55, size: 0.5 },
                    { x: canvas.width * 0.7, y: canvas.height * 0.7, size: 0.4 }
                ];

                positions.forEach(pos => {
                    const size = Math.min(canvas.width, canvas.height) * pos.size;
                    ctx.drawImage(ghostImg, pos.x, pos.y, size, size);
                });

                // Add medium blood tint
                ctx.globalCompositeOperation = 'overlay';
                ctx.globalAlpha = 0.4;  // Increased from 0.2
                ctx.fillStyle = '#cc2222';  // Darker red
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Add medium shadow effect
                const vignette = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, canvas.width/2);
                vignette.addColorStop(0, 'rgba(0,0,0,0)');
                vignette.addColorStop(0.7, 'rgba(0,0,0,0.3)');  // Medium darkness
                vignette.addColorStop(1, 'rgba(0,0,0,0.6)');   // Medium shadow
                ctx.globalCompositeOperation = 'overlay';
                ctx.globalAlpha = 0.8;  // Stronger application
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
            
            ghostImg.src = this.ghostImages[randomMaskIndex];
            console.log('🔄 Loading RANDOM scary mask:', ghostImg.src.substring(0, 50) + '...');
        };
        
        capturedImg.src = this.capturedImage;
    }

    addNoiseEffect(ctx) {
        // Create medium scary noise effect
        const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        const data = imageData.data;

        // Add medium noise and blood effects
        for (let i = 0; i < data.length; i += 4) {
            const noise = (Math.random() - 0.5) * 70;  // Increased intensity to medium
            const bloodEffect = Math.random() > 0.8 ? 40 : 0;  // More frequent, medium blood effect
            
            data[i] = Math.max(0, Math.min(255, data[i] + noise + bloodEffect));     // Red
            data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise * 0.6)); // Green
            data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise * 0.6)); // Blue
            
            // Medium darkening
            data[i] = Math.floor(data[i] * 0.75);     // Medium darkening
            data[i + 1] = Math.floor(data[i + 1] * 0.7);
            data[i + 2] = Math.floor(data[i + 2] * 0.7);
        }

        ctx.putImageData(imageData, 0, 0);
    }

    playScarySounds() {
        console.log('🧙‍♀️ Playing REAL WITCH GHOST SCARING AUDIO!');
        console.log('📊 Audio context available:', !!window.AudioContext || !!window.webkitAudioContext);
        console.log('📱 Android device:', this.isAndroid, 'Audio unlocked:', this.audioUnlocked);
        
        // For Android, ensure audio is unlocked first
        if (this.isAndroid && !this.audioUnlocked) {
            console.log('🔒 Audio not unlocked on Android, trying to unlock...');
            this.unlockAudio().then(() => {
                setTimeout(() => this.playWitchAudio(), 100);
            });
        } else {
            this.playWitchAudio();
        }
        
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
                
                // Android-specific volume and handling
                if (this.isAndroid) {
                    witchAudio1.volume = 0.9; // Slightly lower for Android
                    console.log('📱 Using Android-optimized volume: 0.9');
                    
                    // Android often needs a small delay
                    setTimeout(() => {
                        witchAudio1.currentTime = 0;
                        const playPromise = witchAudio1.play();
                        if (playPromise) {
                            playPromise.then(() => {
                                console.log('🧙‍♀️ SUCCESS! Android witch audio playing!');
                            }).catch((error) => {
                                console.log('❌ Android audio failed, trying fallback:', error.message);
                                this.playAndroidAudioFallback();
                            });
                        }
                    }, 50);
                } else {
                    witchAudio1.volume = 1.0;
                    witchAudio1.currentTime = 0;
                }
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

    playAndroidAudioFallback() {
        console.log('📱 ANDROID-SPECIFIC AUDIO FALLBACK!');
        
        if (!this.audioUnlocked) {
            console.log('🔒 Audio not unlocked, unlocking first...');
            this.unlockAudio().then(() => {
                setTimeout(() => this.playAndroidAudioFallback(), 100);
            });
            return;
        }
        
        try {
            // Method 1: Web Audio API with Android optimization
            if (this.audioContext && this.audioContext.state === 'running') {
                console.log('🎵 Using Web Audio API for Android...');
                this.createAndroidScaryAudio();
            }
            
            // Method 2: Multiple audio elements with Android-specific settings
            const audioUrls = [
                'witch-scream.mp3',
                './witch-scream.mp3',
                location.origin + '/witch-scream.mp3'
            ];
            
            audioUrls.forEach((url, index) => {
                setTimeout(() => {
                    try {
                        const audio = new Audio(url);
                        audio.volume = 0.8; // Android-friendly volume
                        audio.preload = 'auto';
                        audio.crossOrigin = 'anonymous';
                        
                        // Android-specific event handling
                        audio.addEventListener('canplaythrough', () => {
                            console.log(`📱 Android audio ${index + 1} ready to play`);
                            const playPromise = audio.play();
                            if (playPromise) {
                                playPromise.then(() => {
                                    console.log(`🧙‍♀️ SUCCESS! Android witch audio ${index + 1} playing!`);
                                }).catch((error) => {
                                    console.log(`❌ Android audio ${index + 1} play failed:`, error.message);
                                });
                            }
                        });
                        
                        audio.addEventListener('error', (e) => {
                            console.log(`❌ Android audio ${index + 1} load error:`, e.message);
                        });
                        
                        audio.load();
                        
                    } catch (error) {
                        console.log(`❌ Android audio ${index + 1} creation failed:`, error);
                    }
                }, index * 100); // Stagger attempts
            });
            
        } catch (error) {
            console.log('❌ Android fallback failed, trying synthetic sounds:', error);
            this.createAndroidScaryAudio();
        }
    }

    createAndroidScaryAudio() {
        if (!this.audioContext || this.audioContext.state !== 'running') {
            console.log('⚠️ AudioContext not ready for Android synthetic audio');
            return;
        }
        
        try {
            console.log('🎶 Creating synthetic scary sounds for Android...');
            
            // Create a more aggressive synthetic scream for Android
            const frequencies = [100, 200, 400, 800, 1200];
            const duration = 2;
            
            frequencies.forEach((freq, index) => {
                setTimeout(() => {
                    const oscillator = this.audioContext.createOscillator();
                    const gainNode = this.audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(this.audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
                    oscillator.type = index % 2 === 0 ? 'sawtooth' : 'square';
                    
                    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
                    gainNode.gain.linearRampToValueAtTime(0.3, this.audioContext.currentTime + 0.1);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
                    
                    oscillator.start(this.audioContext.currentTime);
                    oscillator.stop(this.audioContext.currentTime + duration);
                    
                    console.log(`🎵 Android synthetic sound ${index + 1} created at ${freq}Hz`);
                }, index * 200);
            });
            
        } catch (error) {
            console.log('❌ Android synthetic audio failed:', error);
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