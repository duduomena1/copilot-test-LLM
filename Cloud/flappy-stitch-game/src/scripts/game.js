// This file contains the main game logic for Flappy Stitch game.
// It initializes the game, handles user input, and manages the game loop.

// Get canvas context from the global gameCanvas object
const gameCanvas = document.getElementById('gameCanvas');
const gameCtx = gameCanvas.getContext('2d');

let frames = 0;
const gravity = 0.25;
const flap = -4.5;
let score = 0;
let isGameOver = false;

// Add pipes array for obstacles
const pipes = {
    position: [],
    top: {
        sprite: { x: 0, y: 0 }
    },
    bottom: {
        sprite: { x: 0, y: 0 }
    },
    width: 50,
    height: 300,
    gap: 150,
    maxYPos: -150,
    dx: 2,

    draw() {
        for(let i = 0; i < this.position.length; i++) {
            let p = this.position[i];
            
            // Draw top pipe
            gameCtx.fillStyle = 'green';
            gameCtx.fillRect(p.x, p.y, this.width, this.height);
            
            // Draw bottom pipe
            gameCtx.fillStyle = 'green';
            gameCtx.fillRect(p.x, p.y + this.height + this.gap, this.width, this.height);
        }
    },

    update() {
        if(frames % 100 === 0) {
            this.position.push({
                x: gameCanvas.width,
                y: this.maxYPos * (Math.random() + 1)
            });
        }
        for(let i = 0; i < this.position.length; i++) {
            let p = this.position[i];
            p.x -= this.dx;

            // Check for collision with stitch
            if(stitch.x + stitch.width > p.x && 
               stitch.x < p.x + this.width &&
               (stitch.y < p.y + this.height || 
                stitch.y + stitch.height > p.y + this.height + this.gap)) {
                isGameOver = true;
            }

            // Score point when passing pipe
            if(p.x + this.width < stitch.x && !p.passed) {
                score++;
                p.passed = true;
                document.getElementById('scoreValue').textContent = score;
            }

            // Remove pipes that are off screen
            if(p.x + this.width <= 0) {
                this.position.shift();
            }
        }
    }
};

const stitch = {
    x: 50,
    y: 150,
    width: 40,
    height: 40,
    velocity: 0,
    
    draw() {
        gameCtx.fillStyle = '#0066cc';
        gameCtx.fillRect(this.x, this.y, this.width, this.height);
        
        // Add eyes
        gameCtx.fillStyle = 'white';
        gameCtx.fillRect(this.x + 25, this.y + 10, 8, 8);
        gameCtx.fillRect(this.x + 8, this.y + 10, 8, 8);
    },
    
    flap() {
        this.velocity = flap;
    },
    
    update() {
        this.velocity += gravity;
        this.y += this.velocity;

        // Check boundaries
        if(this.y + this.height >= gameCanvas.height) {
            this.y = gameCanvas.height - this.height;
            isGameOver = true;
        }
        if(this.y <= 0) {
            this.y = 0;
            this.velocity = 0;
        }
    }
};

function gameLoop() {
    frames++;
    
    // Clear canvas
    gameCtx.fillStyle = '#70c5ce';
    gameCtx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    
    if(!isGameOver) {
        // Update and draw pipes
        pipes.update();
        pipes.draw();
        
        // Update and draw stitch
        stitch.update();
        stitch.draw();
        
        requestAnimationFrame(gameLoop);
    } else {
        // Show game over screen
        document.getElementById('gameOver').style.display = 'block';
    }
}

// Event listeners
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        if(isGameOver) {
            // Reset game
            isGameOver = false;
            score = 0;
            pipes.position = [];
            stitch.y = 150;
            stitch.velocity = 0;
            document.getElementById('scoreValue').textContent = '0';
            document.getElementById('gameOver').style.display = 'none';
            gameLoop();
        } else {
            stitch.flap();
        }
    }
});

// Start game
gameLoop();