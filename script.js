// --- Global Variables ---
const KEY = 'madara456';
let freePredictions = 10;
let keyActive = false;
let results = ['5', '8', '5', '8', '5', '3', '7', '1', '9', '2']; // Initial 10 results (for simulation)

// --- Sound Effects Setup ---
// Replace 'path/to/...' with your actual sound file paths
const clickSound = new Audio('click.mp3'); 
const winSound = new Audio('win.mp3'); 
const errorSound = new Audio('error.mp3'); 

function playSound(audio) {
    audio.currentTime = 0; // Reset sound to play multiple times
    audio.play();
}

// --- Initial Setup and Activation Logic ---

// Function to handle the first 'Activate Simulator' button click
function activateSimulator() {
    playSound(clickSound);
    
    // 1. Show the video popup (We simulate the video playing, as a real video player is complex)
    const hackPopup = document.getElementById('popup-hack');
    hackPopup.style.display = 'none'; // Hide the hack popup
    
    // 2. Simulate video playing, then show Telegram popup
    // In a real scenario, you'd use <video> element's 'onended' event.
    // Here, we simulate a 3-second video delay.
    alert("Video.mp4 is simulating... (In a real website, the video would play here.)"); 

    setTimeout(() => {
        // 3. Show Telegram Popup
        document.getElementById('popup-telegram').classList.add('active');
        
    }, 3000); // 3-second simulation delay
}

// Function to close the Telegram popup and show the main simulator
function closeTelegramPopup() {
    playSound(clickSound);
    document.getElementById('popup-telegram').classList.remove('active');
    document.getElementById('main-simulator').classList.remove('hidden');
    
    // Update the result boxes on load
    updateResultBoxesDisplay();
}

// --- Main Simulator Functions ---

// Function to update the 10 small input boxes based on the 'results' array
function updateResultBoxesDisplay() {
    const resultBoxes = document.querySelectorAll('.result-box');
    resultBoxes.forEach((box, index) => {
        box.value = results[index] || ''; // Display the current result array
    });
}

// Function to update the results with the latest one
function updateResults() {
    playSound(clickSound);
    const latestResult = document.getElementById('actual-result').value.trim();

    if (latestResult.length === 1 && !isNaN(parseInt(latestResult))) {
        // Shift array: remove the oldest (first) and add the newest (last)
        results.shift(); 
        results.push(latestResult);

        // Clear the input box and update display
        document.getElementById('actual-result').value = '';
        updateResultBoxesDisplay();
        alert(`Result ${latestResult} added. Oldest result removed.`);
        
    } else {
        alert('Please enter a single number for the Actual Result.');
        playSound(errorSound);
    }
}

// Function to simulate the 100 AI Psychology Prediction
function generatePrediction() {
    playSound(clickSound);
    
    if (!keyActive && freePredictions <= 0) {
        alert('Free predictions limit reached. Please enter the Key to continue.');
        playSound(errorSound);
        return;
    }

    const periodNumber = document.getElementById('period-number').value.trim();

    if (periodNumber === "") {
        alert('Please enter the Period Number.');
        playSound(errorSound);
        return;
    }

    // --- AI Prediction Logic Simulation ---
    // In a real educational project, this would be a complex math function.
    // Here, we use a simple simulation based on the last result for demonstration.
    
    const lastResult = parseInt(results[results.length - 1]);
    
    // Simple logic: If last result is even, predict odd number and 'Big'.
    let predictedNumber;
    let predictedBigSmall;
    
    if (lastResult % 2 === 0) {
        predictedNumber = Math.floor(Math.random() * 5) * 2 + 1; // Random odd number (1, 3, 5, 7, 9)
        predictedBigSmall = "BIG";
    } else {
        predictedNumber = Math.floor(Math.random() * 5) * 2; // Random even number (0, 2, 4, 6, 8)
        predictedBigSmall = "SMALL";
    }

    // You also requested the *opposite* prediction from the 100 human psychology.
    const oppositeNumber = (predictedNumber + 5) % 10;
    const oppositeBigSmall = (predictedBigSmall === "BIG") ? "SMALL" : "BIG";

    // We will show the original AI prediction for simplicity
    
    // 1. Show Hacker Calculation Display
    updateHackerDisplay();

    // 2. Show Prediction Popup
    const predPopup = document.getElementById('popup-prediction');
    document.getElementById('pred-period').textContent = `Period: ${periodNumber}`;
    document.getElementById('pred-big-small').textContent = `PREDICT: ${predictedBigSmall}`;
    document.getElementById('pred-number').textContent = `Number: ${predictedNumber}`;
    predPopup.classList.add('active');

    // Hide the popup after 5 seconds
    setTimeout(() => {
        predPopup.classList.remove('active');
    }, 5000);

    // 3. Update Free Predictions
    if (!keyActive) {
        freePredictions--;
        document.getElementById('free-predictions-left').textContent = `Free Predictions Left: ${freePredictions}`;
    }
}

// Function to simulate the "hacker" calculation display
function updateHackerDisplay() {
    const display = document.getElementById('hacker-display');
    const logs = [
        `[INFO] Analyzing Period ${document.getElementById('period-number').value}...`,
        `[CALC] Trend Pattern ${results.join('-')} Match Rate: 87.2%`,
        `[NETWORK] AI Unit 37: Action WIN. AI Unit 58: Action LOSS.`,
        `[RESULT] Optimal Vector (Big/Small): Calculated.`,
        `[MATRIX] Rerouting Human Psychology Variables...`,
        `[FINAL] Prediction Generated. Code 45xT-291Z.`,
        `----------------------------------------`
    ];
    
    // Clear and add new log lines one by one for an effect
    display.innerHTML = '';
    logs.forEach((log, index) => {
        setTimeout(() => {
            display.innerHTML += `<p>${log}</p>`;
            display.scrollTop = display.scrollHeight; // Scroll to bottom
        }, 100 * index);
    });
}

// Function to handle Win/Loss feedback (100 AI action simulation)
function sendFeedback(type) {
    playSound(clickSound);
    
    // This is where you would program the 100 AI/Human's action simulation
    // E.g., If 'Win', 100 AI minds update their confidence score. If 'Loss', they change their next strategy.
    
    if (type === 'win') {
        alert("Feedback: WIN sent! 100 AI minds are updating their positive trend data and increasing next prediction's stake (Simulated).");
        playSound(winSound);
    } else {
        alert("Feedback: LOSS sent! 100 AI minds are adjusting their pattern recognition algorithm and lowering next prediction's stake (Simulated).");
        playSound(errorSound); // Using error sound for Loss feedback
    }
}

// Function to activate the key
function activateKey() {
    playSound(clickSound);
    const enteredKey = document.getElementById('prediction-key').value.trim();

    if (enteredKey === KEY) {
        keyActive = true;
        document.getElementById('prediction-status').textContent = 'Status: Activated (Unlimited)';
        document.getElementById('free-predictions-left').textContent = 'Unlimited';
        alert('Key Activated! You now have unlimited predictions.');
        document.getElementById('prediction-key').style.borderColor = '#00ff00';
    } else {
        alert('Invalid Key. Please try again or Buy Key.');
        playSound(errorSound);
        document.getElementById('prediction-key').style.borderColor = '#ff0000';
    }
}

// Initialize the display on page load
document.addEventListener('DOMContentLoaded', () => {
    // We only show the hack popup initially, the rest are hidden by CSS/JS
    document.getElementById('popup-hack').classList.add('active'); 
    
    // Set initial status text
    document.getElementById('free-predictions-left').textContent = `Free Predictions Left: ${freePredictions}`;
});
