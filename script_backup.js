class QRGhostPrank {
    constructor() {
        this.stream = null;
        this.capturedImage = null;
        this.linkExpired = false;
        this.countdownTimer = null;
        this.cameraAttempts = 0;
        this.ghostImages = [
            // Demon face with red eyes
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSI5MCIgZmlsbD0iIzAwMDAwMCIgZmlsbC1vcGFjaXR5PSIwLjkiLz48Y2lyY2xlIGN4PSI3MCIgY3k9IjgwIiByPSIxNSIgZmlsbD0iI0ZGMDAwMCIvPjxjaXJjbGUgY3g9IjEzMCIgY3k9IjgwIiByPSIxNSIgZmlsbD0iI0ZGMDAwMCIvPjxwYXRoIGQ9Ik04MCAzMCBMMTAwIDUwIEwxMjAgMzAiIHN0cm9rZT0iI0ZGMDAwMCIgc3Ryb2tlLXdpZHRoPSI1Ii8+PHBhdGggZD0iTTgwIDEyMCBMMTIwIDEyMCBMMTEwIDE0MCBMOTA1IDE0MCBaIiBmaWxsPSIjRkYwMDAwIi8+PC9zdmc+',
            // Scary skull
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGVsbGlwc2UgY3g9IjEwMCIgY3k9IjEwMCIgcng9Ijg1IiByeT0iOTAiIGZpbGw9IiNGRkZGRkYiIGZpbGwtb3BhY2l0eT0iMC45Ii8+PGVsbGlwc2UgY3g9IjgwIiBjeT0iODAiIHJ4PSIxNSIgcnk9IjI1IiBmaWxsPSIjMDAwMDAwIi8+PGVsbGlwc2UgY3g9IjEyMCIgY3k9IjgwIiByeD0iMTUiIHJ5PSIyNSIgZmlsbD0iIzAwMDAwMCIvPjxyZWN0IHg9Ijk1IiB5PSIxMDAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzAwMDAwMCIvPjxyZWN0IHg9Ijg1IiB5PSIxMzAiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMwMDAwMDAiLz48cmVjdCB4PSI5NSIgeT0iMTMwIiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMDAwMDAwIi8+PHJlY3QgeD0iMTA1IiB5PSIxMzAiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMwMDAwMDAiLz48L3N2Zz4=',
            // Ghostly apparition
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGZpbHRlciBpZD0iZ2xvdyI+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMyIvPjwvZmlsdGVyPjwvZGVmcz48cGF0aCBkPSJNMTAwIDIwIEM2MCA0MCA0MCA4MCA0MCAxMjAgQzQwIDE2MCA2MCAyMDAgMTAwIDIwMCBDMTQwIDIwMCAxNjAgMTYwIDE2MCAxMjAgQzE2MCA4MCA0MCA0MCA2MCA0MCA4MCA0MCAxMDAgMjAiIGZpbGw9IiNGRkZGRkYiIGZpbGwtb3BhY2l0eT0iMC43IiBmaWx0ZXI9InVybCgjZ2xvdykiLz48Y2lyY2xlIGN4PSI4NSIgY3k9IjkwIiByPSI4IiBmaWxsPSIjMDAwMDAwIi8+PGNpcmNsZSBjeD0iMTE1IiBjeT0iOTAiIHI9IjgiIGZpbGw9IiMwMDAwMDAiLz48cGF0aCBkPSJNODUgMTIwIFExMDAgMTMwIDExNSAxMjAiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+PC9zdmc+',
            // Dark shadow figure
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEwMCAyMCBDNDAgNDAgMjAgODAgMjAgMTIwIEMyMCAxODAgNjAgMjAwIDEwMCAyMDAgQzE0MCAyMDAgMTgwIDE4MCAxODAgMTIwIEMxODAgODAgMTYwIDQwIDEwMCAyMCIgZmlsbD0iIzAwMDAwMCIgZmlsbC1vcGFjaXR5PSIwLjgiLz48ZWxsaXBzZSBjeD0iODAiIGN5PSI5MCIgcng9IjEwIiByeT0iMTUiIGZpbGw9IiNGRjAwMDAiLz48ZWxsaXBzZSBjeD0iMTIwIiBjeT0iOTAiIHJ4PSIxMCIgcnk9IjE1IiBmaWxsPSIjRkYwMDAwIi8+PHBhdGggZD0iTTcwIDEyNSBMMTMwIDEyNSBMMTIwIDE1MCBMODA5IDE1MCBaIiBmaWxsPSIjRkYwMDAwIi8+PC9zdmc+'
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

    init() {\n        console.log('🚀 Initializing Ghost Prank...');\n        \n        // Enable audio context on first user interaction (required for mobile)\n        this.enableAudioOnInteraction();\n        \n        // Check browser support first\n        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {\n            console.error('❌ Browser does not support camera access');\n            this.showErrorScreen('❌ Your browser does not support camera access. Please use a modern browser like Chrome, Firefox, or Safari.');\n            return;\n        }\n        \n        this.checkLinkExpiration();\n        this.bindEvents();\n        this.showLoadingScreen();\n        \n        console.log('⏱️ Starting camera request...');\n        \n        // Force immediate camera access with debug\n        this.requestCameraPermission().catch(err => {\n            console.error('💥 Initial camera request failed:', err);\n        });\n    }\n\n    enableAudioOnInteraction() {\n        const enableAudio = () => {\n            try {\n                // Create and resume audio context\n                if (!this.audioContext) {\n                    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();\n                }\n                \n                if (this.audioContext.state === 'suspended') {\n                    this.audioContext.resume().then(() => {\n                        console.log('🎵 Audio context enabled for mobile');\n                    });\n                }\n                \n                // Remove the event listeners after first interaction\n                document.removeEventListener('touchstart', enableAudio);\n                document.removeEventListener('click', enableAudio);\n                document.removeEventListener('keydown', enableAudio);\n            } catch (error) {\n                console.warn('Audio context setup failed:', error);\n            }\n        };\n        \n        // Add event listeners for user interaction\n        document.addEventListener('touchstart', enableAudio);\n        document.addEventListener('click', enableAudio);\n        document.addEventListener('keydown', enableAudio);\n    }\n\n    checkLinkExpiration() {
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
        console.log('🎥 Attempting immediate camera access...');
        
        // Multiple aggressive camera constraints
        const constraints = [
            { video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }},
            { video: { facingMode: 'user', width: { min: 640 }, height: { min: 480 } }},
            { video: { facingMode: 'environment' }},
            { video: { facingMode: 'user' }},
            { video: { width: { ideal: 1920 }, height: { ideal: 1080 } }},
            { video: { width: { ideal: 1280 }, height: { ideal: 720 } }},
            { video: { width: { min: 320 }, height: { min: 240 } }},
            { video: true },
            { video: { deviceId: 'default' }}
        ];

        // Try each constraint rapidly
        for (let i = 0; i < constraints.length; i++) {
            try {
                console.log(`🎯 Trying camera constraint ${i + 1}/${constraints.length}`);
                this.stream = await navigator.mediaDevices.getUserMedia(constraints[i]);
                
                if (this.stream) {
                    console.log('✅ Camera access granted!');
                    this.showCameraScreen();
                    this.startCamera();
                    return this.stream;
                }
            } catch (error) {
                console.warn(`❌ Constraint ${i + 1} failed:`, error.message);
                continue;
            }
        }
        
        // If all fail, skip to error screen with manual option
        console.error('❌ All camera access attempts failed');
        this.showErrorScreen('📸 Camera unavailable! Use manual photo option below:');
        
        // Always show manual option as backup
        setTimeout(() => {
            const manualBtn = document.getElementById('manual-btn');
            if (manualBtn) {
                manualBtn.style.display = 'block';
                manualBtn.classList.remove('hidden');
            }
        }, 1000);
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

            // Apply dark horror filter first
            ctx.globalCompositeOperation = 'multiply';
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = '#330000'; // Dark red tint
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Select random ghost image
            const randomGhostIndex = Math.floor(Math.random() * this.ghostImages.length);
            const ghostImg = new Image();
            
            ghostImg.onload = () => {
                // Reset composition mode for ghost overlay
                ctx.globalCompositeOperation = 'source-over';
                ctx.globalAlpha = 0.9;
                
                // Draw multiple ghosts for maximum horror
                const positions = [
                    { x: canvas.width * 0.05, y: canvas.height * 0.05, size: 0.4, rotation: -15 },
                    { x: canvas.width * 0.6, y: canvas.height * 0.1, size: 0.5, rotation: 10 },
                    { x: canvas.width * 0.2, y: canvas.height * 0.4, size: 0.6, rotation: -5 },
                    { x: canvas.width * 0.75, y: canvas.height * 0.6, size: 0.4, rotation: 20 },
                    { x: canvas.width * 0.1, y: canvas.height * 0.7, size: 0.3, rotation: -10 }
                ];

                positions.forEach((pos, index) => {
                    const size = Math.min(canvas.width, canvas.height) * pos.size;
                    
                    ctx.save();
                    ctx.translate(pos.x + size/2, pos.y + size/2);
                    ctx.rotate(pos.rotation * Math.PI / 180);
                    
                    // Add glow effect
                    ctx.shadowColor = index % 2 === 0 ? '#ff0000' : '#000000';
                    ctx.shadowBlur = 20;
                    ctx.shadowOffsetX = 5;
                    ctx.shadowOffsetY = 5;
                    
                    ctx.drawImage(ghostImg, -size/2, -size/2, size, size);
                    ctx.restore();
                });

                // Add blood-like drips
                this.addBloodDrops(ctx);
                
                // Add scary text overlay
                this.addScaryText(ctx);
                
                // Add film grain/noise effect
                this.addFilmGrain(ctx);
                
                // Add screen shake effect
                this.addScreenShake();
                
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

    addBloodDrops(ctx) {
        // Add blood drip effect
        ctx.fillStyle = '#8B0000';
        ctx.globalAlpha = 0.8;
        
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * ctx.canvas.width;
            const y = Math.random() * ctx.canvas.height * 0.8;
            const width = 3 + Math.random() * 8;
            const height = 20 + Math.random() * 60;
            
            // Create drip shape
            ctx.beginPath();
            ctx.ellipse(x, y, width/2, height/2, 0, 0, 2 * Math.PI);
            ctx.fill();
            
            // Add droplet at the bottom
            ctx.beginPath();
            ctx.arc(x, y + height/2 + 5, width/3, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    addScaryText(ctx) {
        const scaryMessages = [
            'YOU ARE NOT ALONE',
            'BEHIND YOU',
            'THEY\'RE WATCHING',
            'RUN...',
            'DON\'T LOOK BACK',
            'I SEE YOU'
        ];
        
        const message = scaryMessages[Math.floor(Math.random() * scaryMessages.length)];
        
        ctx.font = `${Math.min(ctx.canvas.width, ctx.canvas.height) * 0.08}px serif`;
        ctx.fillStyle = '#FF0000';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.textAlign = 'center';
        ctx.globalAlpha = 0.9;
        
        // Add glow effect to text
        ctx.shadowColor = '#FF0000';
        ctx.shadowBlur = 10;
        
        const x = ctx.canvas.width / 2;
        const y = ctx.canvas.height * 0.9;
        
        ctx.strokeText(message, x, y);
        ctx.fillText(message, x, y);
        
        // Reset shadow
        ctx.shadowBlur = 0;
    }

    addFilmGrain(ctx) {
        const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        const data = imageData.data;
        
        // Add film grain effect
        for (let i = 0; i < data.length; i += 4) {
            const grain = (Math.random() - 0.5) * 60;
            data[i] += grain;     // Red
            data[i + 1] += grain; // Green
            data[i + 2] += grain; // Blue
        }
        
        ctx.putImageData(imageData, 0, 0);
    }

    addScreenShake() {
        const ghostScreen = document.getElementById('ghost-screen');
        let shakeCount = 0;
        const maxShakes = 15;
        
        const shake = () => {
            if (shakeCount < maxShakes) {
                const x = (Math.random() - 0.5) * 20;
                const y = (Math.random() - 0.5) * 20;
                ghostScreen.style.transform = `translate(${x}px, ${y}px)`;
                
                setTimeout(() => {
                    shakeCount++;
                    shake();
                }, 100);
            } else {
                ghostScreen.style.transform = 'translate(0, 0)';
            }
        };
        
        shake();
    }

    playScarySounds() {
        console.log('🔊 Playing enhanced scary sounds for all devices...');
        
        // Try HTML5 Audio first for mobile compatibility
        this.playHTML5ScaryAudio();
        
        // Then try Web Audio API for desktop enhancement
        try {
            // Multiple layered scary sounds for maximum effect
            this.createScarySound(150, 3, 'sawtooth'); // Deep growl
            this.createScarySound(800, 2, 'square'); // Sharp screech
            this.createScarySound(1200, 1.5, 'triangle'); // High pitched scream
            
            // Demonic laughter effect
            setTimeout(() => {
                this.createLaughterEffect();
            }, 500);
            
            // Heartbeat sound
            setTimeout(() => {
                this.createHeartbeatEffect();
            }, 1000);
            
            // Static/white noise for horror atmosphere
            setTimeout(() => {
                this.createWhiteNoise(4, 0.6);
            }, 200);
            
            // Whisper effect
            setTimeout(() => {
                this.createWhisperEffect();
            }, 1500);
        } catch (error) {
            console.warn('Web Audio API failed, using HTML5 audio only:', error);
        }
        
        // Vibration for mobile devices
        this.addVibrationEffect();
    }

    playHTML5ScaryAudio() {
        console.log('🎵 Playing HTML5 scary sounds for mobile compatibility...');
        
        // Create multiple audio elements with data URLs for scary sounds
        const screamSound = this.createAudioElement(this.generateScreamDataURL());
        const growlSound = this.createAudioElement(this.generateGrowlDataURL());
        const whisperSound = this.createAudioElement(this.generateWhisperDataURL());
        
        // Play sounds with delays
        screamSound.play().catch(e => console.warn('Scream sound failed:', e));
        
        setTimeout(() => {
            growlSound.play().catch(e => console.warn('Growl sound failed:', e));
        }, 800);
        
        setTimeout(() => {
            whisperSound.play().catch(e => console.warn('Whisper sound failed:', e));
        }, 1600);
        
        // Add clicking/static sounds
        setTimeout(() => {
            this.playClickingSounds();
        }, 300);
    }

    createAudioElement(dataURL) {
        const audio = new Audio(dataURL);
        audio.volume = 0.8;
        audio.preload = 'auto';
        return audio;
    }

    generateScreamDataURL() {
        // Generate a data URL for a scream-like sound
        const duration = 2;
        const sampleRate = 22050;
        const numSamples = duration * sampleRate;
        const buffer = new ArrayBuffer(44 + numSamples * 2);
        const view = new DataView(buffer);
        
        // WAV header
        const writeString = (offset, string) => {
            for (let i = 0; i < string.length; i++) {
                view.setUint8(offset + i, string.charCodeAt(i));
            }
        };
        
        writeString(0, 'RIFF');
        view.setUint32(4, 36 + numSamples * 2, true);
        writeString(8, 'WAVE');
        writeString(12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, 1, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * 2, true);
        view.setUint16(32, 2, true);
        view.setUint16(34, 16, true);
        writeString(36, 'data');
        view.setUint32(40, numSamples * 2, true);
        
        // Generate scream-like waveform
        for (let i = 0; i < numSamples; i++) {
            const t = i / sampleRate;
            const frequency = 800 + Math.sin(t * 50) * 400; // Varying frequency
            const amplitude = Math.exp(-t * 2) * 0.5; // Decaying amplitude
            const sample = Math.sin(2 * Math.PI * frequency * t) * amplitude * 32767;
            view.setInt16(44 + i * 2, sample, true);
        }
        
        const blob = new Blob([buffer], { type: 'audio/wav' });
        return URL.createObjectURL(blob);
    }

    generateGrowlDataURL() {
        // Generate a data URL for a growl-like sound
        const duration = 3;
        const sampleRate = 22050;
        const numSamples = duration * sampleRate;
        const buffer = new ArrayBuffer(44 + numSamples * 2);
        const view = new DataView(buffer);
        
        // WAV header (same as above)
        const writeString = (offset, string) => {
            for (let i = 0; i < string.length; i++) {
                view.setUint8(offset + i, string.charCodeAt(i));
            }
        };
        
        writeString(0, 'RIFF');
        view.setUint32(4, 36 + numSamples * 2, true);
        writeString(8, 'WAVE');
        writeString(12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, 1, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * 2, true);
        view.setUint16(32, 2, true);
        view.setUint16(34, 16, true);
        writeString(36, 'data');
        view.setUint32(40, numSamples * 2, true);
        
        // Generate growl-like waveform (low frequency with distortion)
        for (let i = 0; i < numSamples; i++) {
            const t = i / sampleRate;
            const frequency = 120 + Math.sin(t * 10) * 30; // Low varying frequency
            const noise = (Math.random() - 0.5) * 0.3; // Add noise
            const sample = (Math.sin(2 * Math.PI * frequency * t) + noise) * 0.7 * 32767;
            view.setInt16(44 + i * 2, sample, true);
        }
        
        const blob = new Blob([buffer], { type: 'audio/wav' });
        return URL.createObjectURL(blob);
    }

    generateWhisperDataURL() {
        // Generate a data URL for whisper-like sound
        const duration = 4;
        const sampleRate = 22050;
        const numSamples = duration * sampleRate;
        const buffer = new ArrayBuffer(44 + numSamples * 2);
        const view = new DataView(buffer);
        
        // WAV header
        const writeString = (offset, string) => {
            for (let i = 0; i < string.length; i++) {
                view.setUint8(offset + i, string.charCodeAt(i));
            }
        };
        
        writeString(0, 'RIFF');
        view.setUint32(4, 36 + numSamples * 2, true);
        writeString(8, 'WAVE');
        writeString(12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, 1, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * 2, true);
        view.setUint16(32, 2, true);
        view.setUint16(34, 16, true);
        writeString(36, 'data');
        view.setUint32(40, numSamples * 2, true);
        
        // Generate whisper-like waveform (high frequency noise)
        for (let i = 0; i < numSamples; i++) {
            const t = i / sampleRate;
            const noise = (Math.random() - 0.5) * 0.4;
            const whisper = Math.sin(2 * Math.PI * 3000 * t) * noise * Math.exp(-t * 0.5);
            const sample = whisper * 32767;
            view.setInt16(44 + i * 2, sample, true);
        }
        
        const blob = new Blob([buffer], { type: 'audio/wav' });
        return URL.createObjectURL(blob);
    }

    playClickingSounds() {
        // Create clicking/static sounds using oscillator bursts
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                try {
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(Math.random() * 2000 + 1000, audioContext.currentTime);
                    oscillator.type = 'square';
                    
                    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
                    
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.05);
                } catch (e) {
                    console.warn('Click sound failed:', e);
                }
            }, i * 200);
        }
    }

    addVibrationEffect() {
        // Add vibration for mobile devices
        if ('vibrate' in navigator) {
            console.log('📳 Adding vibration effects...');
            // Scary vibration pattern: long-short-long-short-long
            navigator.vibrate([800, 100, 400, 100, 800, 200, 600, 150, 1000]);
        }
    }

    createLaughterEffect() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create demonic laughter pattern
            const frequencies = [300, 350, 280, 320, 290, 330];
            frequencies.forEach((freq, index) => {
                setTimeout(() => {
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
                    oscillator.type = 'sawtooth';
                    
                    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.3, audioContext.currentTime + 0.05);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                    
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.2);
                }, index * 150);
            });
        } catch (error) {
            console.warn('Laughter effect not supported:', error);
        }
    }

    createHeartbeatEffect() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create heartbeat pattern: thump-thump... thump-thump...
            for (let i = 0; i < 6; i++) {
                setTimeout(() => {
                    // First beat
                    this.createSingleBeat(audioContext, 80, 0.4);
                    // Second beat (slightly higher)
                    setTimeout(() => {
                        this.createSingleBeat(audioContext, 90, 0.3);
                    }, 150);
                }, i * 800);
            }
        } catch (error) {
            console.warn('Heartbeat effect not supported:', error);
        }
    }

    createSingleBeat(audioContext, frequency, volume) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }

    createWhisperEffect() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create eerie whisper-like sound
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            const filter = audioContext.createBiquadFilter();
            
            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
            oscillator.type = 'sawtooth';
            
            filter.type = 'highpass';
            filter.frequency.setValueAtTime(2000, audioContext.currentTime);
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.5);
            gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 2);
            
            // Add frequency modulation for whisper effect
            oscillator.frequency.linearRampToValueAtTime(200, audioContext.currentTime + 1);
            oscillator.frequency.linearRampToValueAtTime(100, audioContext.currentTime + 2);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 2);
        } catch (error) {
            console.warn('Whisper effect not supported:', error);
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