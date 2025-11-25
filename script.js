class QRGhostPrank {
    constructor() {
        this.stream = null;
        this.capturedImage = null;
        this.linkExpired = false;
        this.countdownTimer = null;
        this.cameraAttempts = 0;
        this.ghostImages = [
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iOTAiIGZpbGw9IiNGRkZGRkYiIGZpbGwtb3BhY2l0eT0iMC44Ii8+CjxjaXJjbGUgY3g9IjcwIiBjeT0iODAiIHI9IjgiIGZpbGw9IiMwMDAwMDAiLz4KPGNpcmNsZSBjeD0iMTMwIiBjeT0iODAiIHI9IjgiIGZpbGw9IiMwMDAwMDAiLz4KPHBhdGggZD0iTTcwIDEyMCBRMTAwIDEzMCAxMzAgMTIwIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4=',
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMDAgMjAgQzE0MCA0MCAzMCA2MCAzMCAxMDAgQzMwIDEzMCA0MCAyMDAgMTAwIDIwMCBDMTYwIDIwMCAxNzAgMTMwIDE3MCAxMDAgQzE3MCA2MCA2MCA0MCAxMDAgMjAiIGZpbGw9IiNGRkZGRkYiIGZpbGwtb3BhY2l0eT0iMC45Ii8+CjxjaXJjbGUgY3g9IjgwIiBjeT0iOTAiIHI9IjEwIiBmaWxsPSIjRkYwMDAwIi8+CjxjaXJjbGUgY3g9IjEyMCIgY3k9IjkwIiByPSIxMCIgZmlsbD0iI0ZGMDAwMCIvPgo8cGF0aCBkPSJNNzAgMTMwIEwxMzAgMTMwIEwxMjAgMTQwIEw4MCAxNDAiIGZpbGw9IiMwMDAwMDAiLz4KPC9zdmc+',
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxlbGxpcHNlIGN4PSIxMDAiIGN5PSIxMDAiIHJ4PSI4MCIgcnk9IjkwIiBmaWxsPSIjRkZGRkZGIiBmaWxsLW9wYWNpdHk9IjAuOCIvPgo8cG9seWdvbiBwb2ludHM9IjgwLDcwIDkwLDkwIDcwLDkwIiBmaWxsPSIjMDAwMDAwIi8+Cjxwb2x5Z29uIHBvaW50cz0iMTIwLDcwIDEzMCw5MCAxMTAsOTAiIGZpbGw9IiMwMDAwMDAiLz4KPHBhdGggZD0iTTcwIDEyMCBMMTMwIDEyMCBMMTI1IDEzNSBMNzUgMTM1IFoiIGZpbGw9IiMwMDAwMDAiLz4KPC9zdmc+'
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
            // Draw the captured image to cover the entire canvas
            ctx.drawImage(capturedImg, 0, 0, canvas.width, canvas.height);

            // Select random ghost image
            const randomGhostIndex = Math.floor(Math.random() * this.ghostImages.length);
            const ghostImg = new Image();
            
            ghostImg.onload = () => {
                // Apply ghost overlay with blend modes
                ctx.globalCompositeOperation = 'overlay';
                ctx.globalAlpha = 0.7;
                
                // Draw ghost in multiple positions for scary effect
                const positions = [
                    { x: canvas.width * 0.1, y: canvas.height * 0.1, size: 0.3 },
                    { x: canvas.width * 0.6, y: canvas.height * 0.2, size: 0.4 },
                    { x: canvas.width * 0.3, y: canvas.height * 0.5, size: 0.5 },
                    { x: canvas.width * 0.8, y: canvas.height * 0.7, size: 0.3 }
                ];

                positions.forEach(pos => {
                    const size = Math.min(canvas.width, canvas.height) * pos.size;
                    ctx.drawImage(ghostImg, pos.x, pos.y, size, size);
                });

                // Add scary red overlay
                ctx.globalCompositeOperation = 'multiply';
                ctx.globalAlpha = 0.3;
                ctx.fillStyle = '#ff0000';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Add noise effect
                this.addNoiseEffect(ctx);
                
                // Show the final result
                this.showGhostScreen();
                this.playScarySounds();
            };
            
            ghostImg.src = this.ghostImages[randomGhostIndex];
        };
        
        capturedImg.src = this.capturedImage;
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
        // Create multiple audio contexts for layered scary sounds
        this.createScarySound(200, 0.5, 'sine'); // Low ominous tone
        this.createScarySound(800, 0.3, 'sawtooth'); // Sharp screech
        this.createScarySound(1200, 0.2, 'square'); // Digital noise
        
        // Play static/white noise
        setTimeout(() => {
            this.createWhiteNoise(1, 0.4);
        }, 500);
        
        // Add tremolo effect
        setTimeout(() => {
            this.createScarySound(300, 0.6, 'triangle');
        }, 1000);
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