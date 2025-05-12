const canvas = document.getElementById('rouletteCanvas');
const ctx = canvas.getContext('2d');

const wheelRadius = 200;
const ballRadius = 10;
let angle = 0;
let speed = 0.1; // Rotation speed
let ballAngle = 0;
let ballSpeed = 0.2; // Ball speed
let ballBouncing = false; // Changed to false initially
let friction = 0.98; // Friction to slow down the ball
let wheelSpinning = false; // Add a flag to control wheel spinning
let wheelFriction = 0.995; // Friction for the wheel
const sections = 36; // Number of sections on the roulette wheel
let animationFrameId; // Store the animation frame ID
let initialBallSpeed = 2; // Initial speed of the ball
let gravity = 0.05; // Gravity effect on the ball
let energyLoss = 0.6; // Energy loss after each bounce

// Ball position and velocity
let ballX, ballY;
let ballVelocityX = 0;
let ballVelocityY = 0;

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(angle);

    // Draw the wheel
    ctx.fillStyle = '#ffcc00';
    ctx.beginPath();
    ctx.arc(0, 0, wheelRadius, 0, Math.PI * 2);
    ctx.fill();

    // Draw the sections
    for (let i = 0; i < sections; i++) {
        ctx.save();
        ctx.rotate((Math.PI * 2 / sections) * i);
        ctx.fillStyle = i % 2 === 0 ? '#ff0000' : '#000000';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(wheelRadius, 0);
        ctx.arc(0, 0, wheelRadius, 0, Math.PI * 2 / sections);
        ctx.fill();
        ctx.restore();
    }

    ctx.restore();
}

function drawBall() {
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

function determineWinningNumber() {
    const normalizedAngle = (angle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
    const sectionAngle = 2 * Math.PI / sections;
    let winningSection = Math.floor(normalizedAngle / sectionAngle);
    winningSection = sections - winningSection - 1; // Adjust for the wheel direction

    return winningSection;
}

function displayWinningNumber(number) {
    const resultElement = document.getElementById('result');
    if (resultElement) {
        resultElement.textContent = `Winning number: ${number}`;
    } else {
        console.log(`Winning number: ${number}`); // Fallback in case the element is not found
    }
}

function resetGame() {
    wheelSpinning = false;
    ballBouncing = false;
    speed = 0.1;
    ballSpeed = 0.2;
    angle = 0;
    const resultElement = document.getElementById('result');
    if (resultElement) {
        resultElement.textContent = '';
    }
    initializeBallPosition();
}

function initializeBallPosition() {
    ballX = wheelRadius - ballRadius;
    ballY = 0;
    ballVelocityX = 0;
    ballVelocityY = 0;
}

function updateBallPhysics() {
    if (ballBouncing) {
        ballX += ballVelocityX;
        ballY += ballVelocityY;
        ballVelocityY += gravity;

        // Check for collision with the bottom of the wheel
        if (ballY + ballRadius > wheelRadius) {
            ballY = wheelRadius - ballRadius;
            ballVelocityY = -ballVelocityY * energyLoss;
            ballVelocityX *= friction; // Apply friction on bounce

            if (Math.abs(ballVelocityY) < 0.5 && Math.abs(ballVelocityX) < 0.5) {
                ballBouncing = false;
                ballVelocityX = 0;
                ballVelocityY = 0;
                const winningNumber = determineWinningNumber();
                displayWinningNumber(winningNumber);
            }
        }
    }
}

function spinRoulette() {
    if (!wheelSpinning && !ballBouncing) {
        resetGame();
        wheelSpinning = true;
        ballBouncing = true;
        initializeBallPosition();
        ballVelocityX = initialBallSpeed;
        ballVelocityY = -initialBallSpeed;
        speed = 0.1;
        update();
    }
}

function update() {
    if (wheelSpinning) {
        speed *= wheelFriction; // Apply friction to slow down the wheel
        angle += speed;

        if (speed < 0.001) {
            speed = 0;
            wheelSpinning = false; // Stop the wheel
        }
    }
    
    if (ballBouncing) {
        updateBallPhysics();
    }

    drawWheel();
    drawBall();
    animationFrameId = requestAnimationFrame(update);
}

canvas.width = 400;
canvas.height = 400;
initializeBallPosition();
update();

// Add event listener to the spin button
document.addEventListener('DOMContentLoaded', () => {
    const spinButton = document.getElementById('spinButton');
    if (spinButton) {
        spinButton.addEventListener('click', spinRoulette);
    }
});