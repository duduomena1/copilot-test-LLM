// game.js

import { ROULETTE_NUMBERS, CANVAS_SIZE } from './constants.js';
import { calculateBallPosition } from './physics.js';
import { RouletteWheel } from './roulette.js';

let isGameRunning = false;
let animationFrameId;
let rouletteWheel;

export function startGame() {
    if (!isGameRunning) {
        isGameRunning = true;
        rouletteWheel = new RouletteWheel('rouletteCanvas');
        gameLoop();
    }
}

export function stopGame() {
    isGameRunning = false;
    cancelAnimationFrame(animationFrameId);
}

function gameLoop() {
    updateGame();
    animationFrameId = requestAnimationFrame(gameLoop);
}

export function updateGame() {
    // Update game state and render the game
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', startGame);