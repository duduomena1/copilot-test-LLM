const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const stichImage = new Image();
stichImage.src = 'assets/images/stich.png';

const gameState = {
    stich: {
        x: 50,
        y: canvas.height / 2,
        width: 50,
        height: 50,
        gravity: 0.6,
        lift: -15,
        velocity: 0,
        jump: function() {
            this.velocity += this.lift;
        },
        update: function() {
            this.velocity += this.gravity;
            this.y += this.velocity;

            if (this.y + this.height >= canvas.height) {
                this.y = canvas.height - this.height;
                this.velocity = 0;
            }

            if (this.y < 0) {
                this.y = 0;
                this.velocity = 0;
            }
        },
        draw: function() {
            if (stichImage.complete && stichImage.naturalWidth !== 0) {
                ctx.drawImage(stichImage, this.x, this.y, this.width, this.height);
            } else {
                // Draw vector version of Stitch
                ctx.fillStyle = "#0066cc"; // Body color
                ctx.beginPath();
                ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
                ctx.fill();
                // Draw simple eyes
                ctx.fillStyle = "white";
                ctx.beginPath();
                ctx.arc(this.x + this.width * 0.35, this.y + this.height * 0.4, this.width * 0.1, 0, Math.PI * 2);
                ctx.arc(this.x + this.width * 0.65, this.y + this.height * 0.4, this.width * 0.1, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    },
    obstacles: [],
    frame: 0,
    score: 0,
    gameOver: false,
};

function createObstacle() {
    const gap = 100;
    const width = 50;
    const height = Math.random() * (canvas.height - gap - 20) + 20;
    gameState.obstacles.push({
        x: canvas.width,
        y: 0,
        width: width,
        height: height,
        passed: false,
    });
    gameState.obstacles.push({
        x: canvas.width,
        y: height + gap,
        width: width,
        height: canvas.height - height - gap,
        passed: false,
    });
}

function updateObstacles() {
    for (let i = gameState.obstacles.length - 1; i >= 0; i--) {
        const obstacle = gameState.obstacles[i];
        obstacle.x -= 2;

        if (obstacle.x + obstacle.width < 0) {
            gameState.obstacles.splice(i, 1);
            if (!obstacle.passed) {
                gameState.score++;
                obstacle.passed = true;
            }
        }
    }
}

function drawObstacles() {
    ctx.fillStyle = 'green';
    for (const obstacle of gameState.obstacles) {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${gameState.score}`, 10, 20);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!gameState.gameOver) {
        gameState.stich.update();
        gameState.stich.draw();
        updateObstacles();
        drawObstacles();
        drawScore();

        if (gameState.frame % 75 === 0) {
            createObstacle();
        }

        for (const obstacle of gameState.obstacles) {
            if (
                gameState.stich.x < obstacle.x + obstacle.width &&
                gameState.stich.x + gameState.stich.width > obstacle.x &&
                gameState.stich.y < obstacle.y + obstacle.height &&
                gameState.stich.y + gameState.stich.height > obstacle.y
            ) {
                gameState.gameOver = true;
            }
        }

        gameState.frame++;
        requestAnimationFrame(gameLoop);
    } else {
        ctx.fillStyle = 'red';
        ctx.font = '40px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
    }
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        gameState.stich.jump();
    }
});

stichImage.onload = function() {
    gameLoop();
};

stichImage.onerror = function() {
    console.error("Falha ao carregar 'assets/images/stich.png'. Iniciando jogo sem a imagem.");
    gameLoop();
};

// Adiciona o evento para reiniciar o jogo
document.getElementById('restartButton').addEventListener('click', function() {
    // Reseta o estado do jogo
    gameState.stich.x = 50;
    gameState.stich.y = canvas.height / 2;
    gameState.stich.velocity = 0;
    gameState.obstacles = [];
    gameState.frame = 0;
    gameState.score = 0;
    gameState.gameOver = false;
    gameLoop();
});