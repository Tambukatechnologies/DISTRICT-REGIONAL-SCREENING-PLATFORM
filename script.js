// --- CAMERA & BIOMETRICS HANDLER ---
const video = document.getElementById('webcam');
const startCamBtn = document.getElementById('startCamBtn');
const captureBtn = document.getElementById('captureBtn');
const scanStatus = document.getElementById('scanStatus');

let stream = null;

// Function to activate the phone camera
async function startCamera() {
  scanStatus.textContent = "Requesting camera permission...";
  try {
    // 'user' targets front camera on phones, use 'environment' for back camera
    stream = await navigator.mediaDevices.getUserMedia({ 
      video: { facingMode: 'user' }, 
      audio: false 
    });
    video.srcObject = stream;
    scanStatus.textContent = "Camera active. Ready to scan face.";
    captureBtn.disabled = false;
    startCamBtn.textContent = "Stop Camera";
  } catch (err) {
    console.error("Error accessing camera: ", err);
    scanStatus.textContent = "Error: Camera access denied or unavailable.";
  }
}

// Function to stop the phone camera to save battery
function stopCamera() {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    video.srcObject = null;
    scanStatus.textContent = "Camera turned off.";
    captureBtn.disabled = true;
    startCamBtn.textContent = "Open Camera";
    stream = null;
  }
}

// Toggle button logic
startCamBtn.addEventListener('click', () => {
  if (stream === null) {
    startCamera();
  } else {
    stopCamera();
  }
});

// Simulation of scanning/matching logic when button is pressed
captureBtn.addEventListener('click', () => {
  scanStatus.textContent = "Analyzing facial biometrics... 🧬";
  captureBtn.disabled = true;
  
  // Simulate network/processing delay
  setTimeout(() => {
    scanStatus.textContent = "✅ Biometric Match Confirmed! (Age & ID verified)";
    captureBtn.disabled = false;
  }, 2000);
});
