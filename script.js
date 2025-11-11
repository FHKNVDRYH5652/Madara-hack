// --- Global Variables ---
const totalPredictionLimit = 10;
let predictionsUsed = 0;
let isAccessUnlocked = false;

// Array to hold the last 10 results, initialized with placeholder values
let last10Results = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// --- Startup Functions ---

document.addEventListener('DOMContentLoaded', () => {
    createResultInputBoxes();
    // Initially only the welcome overlay is visible
});

// Function to generate the 10 small input boxes
function createResultInputBoxes() {
    const container = document.getElementById('result-boxes');
    for (let i = 0; i < 10; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.classList.add('result-box-input');
        input.placeholder = `R${10 - i}`;
        input.id = `result-box-${i}`;
        input.value = last10Results[i];
        input.maxLength = 1;
        input.addEventListener('input', (e) => {
            // Update the global array when a box is manually changed
            last10Results[i] = parseInt(e.target.value) || 0;
        });
        container.appendChild(input);
    }
}

// --- Pop-up & Access Control Functions ---

function activateSystem() {
    // 1. Simulate Video playback (simply hide the pop-up)
    document.getElementById('welcome-overlay').classList.add('hidden');
    
    // In a real scenario, here you would play video.mp4

    // 2. Show Telegram Pop-up after a short delay (simulating video end)
    setTimeout(() => {
        document.getElementById('telegram-overlay').classList.remove('hidden');
    }, 100); 
}

function closeTelegramPopup() {
    document.getElementById('telegram-overlay').classList.add('hidden');
    document.getElementById('main-dashboard').classList.remove('hidden');
}

function unlockAccess() {
    const keyInput = document.getElementById('access-key').value;
    const requiredKey = 'madara456';
    
    if (keyInput === requiredKey) {
        isAccessUnlocked = true;
        document.getElementById('key-section').classList.add('hidden');
        document.getElementById('prediction-display').innerHTML = '<p>Access Granted: Unlimited Predictions!</p>';
    } else {
        alert('ACCESS DENIED: Incorrect Key.');
    }
}

function showPredictionPopup(period, prediction) {
    document.getElementById('popup-period').textContent = `Period: ${period}`;
    document.getElementById('popup-prediction').textContent = prediction;
    const popup = document.getElementById('prediction-popup');
    popup.classList.remove('hidden');

    // Hide pop-up after 5 seconds
    setTimeout(() => {
        popup.classList.add('hidden');
    }, 5000); 
}

// --- Data Management Functions ---

function updateResults() {
    const newResultInput = document.getElementById('actual-result');
    const newResult = parseInt(newResultInput.value);

    if (isNaN(newResult) || newResult < 0 || newResult > 9) {
        alert("Please enter a valid single digit result (0-9).");
        return;
    }

    // Shift all results: Last one is removed, new one is added to the front
    last10Results.pop(); // Remove the oldest result
    last10Results.unshift(newResult); // Add the newest result to the start

    // Update the input boxes on the screen
    for (let i = 0; i < 10; i++) {
        document.getElementById(`result-box-${i}`).value = last10Results[i];
    }
    
    // Clear the quick update box
    newResultInput.value = '';
    
    // Update the console display
    updateConsoleAnalysis('Latest Result added. Data stream updated.');
}


// --- Prediction Simulation Function ---

function generatePrediction() {
    if (!isAccessUnlocked && predictionsUsed >= totalPredictionLimit) {
        document.getElementById('key-section').classList.remove('hidden');
        document.getElementById('prediction-display').innerHTML = '<p>Prediction Limit Reached. Please enter Key.</p>';
        return;
    }

    const period = document.getElementById('period-number').value;

    if (!period || last10Results.some(r => r === 0)) {
        alert("Please enter a Period Number and ensure all 10 results are filled.");
        return;
    }

    predictionsUsed++;

    // --- Core 100 AI Logic Simulation ---
    // This is a SIMULATION of complex analysis, not a real AI.

    let totalScore = 0;
    
    // 1. Trend Analysis (Simple Pattern)
    const lastThree = last10Results.slice(0, 3);
    const sumLastThree = lastThree.reduce((a, b) => a + b, 0);
    
    // 2. Odd/Even Bias
    const oddCount = last10Results.filter(n => n % 2 !== 0).length;
    const evenCount = 10 - oddCount;

    // 3. 100 Simulated Human/AI Minds
    let humanWins = 0;
    const humanAiStatusDiv = document.getElementById('human-ai-status');
    humanAiStatusDiv.innerHTML = '';

    for (let i = 1; i <= 100; i++) {
        // Simple "Psychology" Logic: Each AI has a slightly different weighting
        const weight = (i % 10) * 0.1; // Weight from 0.1 to 0.9

        // Logic 1: Does the number appear in the last 3 results?
        let predictionBase = (lastThree.includes(i % 10)) ? 1 : 0;

        // Logic 2: Is the sum of last 3 high or low?
        predictionBase += (sumLastThree > 15 && (i % 10) > 5) ? 1 : 0;
        
        // Logic 3: Random factor to simulate human variability
        predictionBase += Math.random() < 0.5 ? -1 : 1; 

        // Final score for this "human"
        const finalScore = Math.floor((predictionBase * weight) + (Math.random() * 5)); 
        totalScore += finalScore;

        // Simulate Win/Loss Action (Action is based on a random threshold)
        const action = finalScore > 3 ? 'UP Action (Win)' : 'DOWN Action (Loss)';
        const statusClass = finalScore > 3 ? 'status-win' : 'status-loss';
        if (finalScore > 3) humanWins++;

        const statusElement = document.createElement('div');
        statusElement.classList.add('status-item', statusClass);
        statusElement.textContent = `[H-${i}] Log: ${finalScore.toFixed(2)} | Action: ${action}`;
        humanAiStatusDiv.appendChild(statusElement);
    }
    
    // --- Final Prediction Generation ---
    // A simplified way to derive a prediction from the total score
    const avgScore = totalScore / 100;

    // The core prediction is derived from the average score (e.g., if avgScore is high, predict a high number)
    // We'll map the score to a 0-9 number.
    let corePrediction = Math.floor((avgScore % 10)); 
    if (corePrediction < 0) corePrediction = 0;
    
    // Opposite Prediction (as requested)
    // Simply use the complementary number (9 - prediction)
    let oppositePrediction = 9 - corePrediction;


    // --- Display Results ---
    const predictionText = `CORE: ${corePrediction} | OPPOSITE: ${oppositePrediction}`;

    document.getElementById('prediction-display').innerHTML = `
        <p>Predicted by 100 Simulated Minds:</p>
        <p class="huge-text">${corePrediction}</p>
        <p>Opposite Recommendation: ${oppositePrediction}</p>
        <p>Minds in Consensus: ${humanWins}%</p>
    `;

    showPredictionPopup(period, corePrediction);
    updateConsoleAnalysis(`--- PREDICTION GENERATED ---
> PERIOD: ${period}
> CORE ANALYSIS RESULT: ${corePrediction}
> OPPOSITE RESULT: ${oppositePrediction}
> Consensus Score: ${avgScore.toFixed(2)} | Win Minds: ${humanWins}/100`);

    // Show key section if limit is reached after this prediction
    if (predictionsUsed >= totalPredictionLimit && !isAccessUnlocked) {
        document.getElementById('key-section').classList.remove('hidden');
    }
}

function updateConsoleAnalysis(message) {
    const consoleOutput = document.getElementById('analysis-output');
    const now = new Date().toLocaleTimeString();
    consoleOutput.textContent += `\n[${now}] ${message}`;
    // Scroll to the bottom
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}
