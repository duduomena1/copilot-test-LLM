const canvas = document.getElementById('rouletteCanvas');
const ctx = canvas.getContext('2d');

const ROULETTE_NUMBERS = [32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26,0];

let wheelRotation = 0;
let ballAngle = 0; // Representa o ângulo atual da bolinha na roleta
let spinning = false;
let spinSpeed = 0;
let ballSpeed = 0;

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(wheelRotation * Math.PI / 180);
    
    // Desenha a roleta
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(0, 0, 150, 0, Math.PI * 2);
    ctx.fill();
    
    // Desenha a bolinha na posição calculada
    const orbitRadius = 140; // Raio para a trajetória da bolinha
    // Calcula posição X e Y da bolinha usando ballAngle
    const ballX = orbitRadius * Math.cos(ballAngle);
    const ballY = orbitRadius * Math.sin(ballAngle);
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
}

function displayWinningNumber(winner) {
    const resultEl = document.getElementById('result');
    if(resultEl) {
        resultEl.textContent = `Winner: ${winner}`;
    }
}

function startSpin() {
    if (!spinning) {
        spinning = true;
        // Gera velocidade de rotação para a roleta e da bolinha
        spinSpeed = Math.random() * 10 + 5; // velocidade entre 5 e 15
        ballSpeed = Math.random() * 0.1 + 0.1; // velocidade angular inicial da bolinha entre 0.1 e 0.2 rad/frame
        ballAngle = 0; // reinicia o ângulo da bolinha
        // Limpa resultado anterior
        const resultEl = document.getElementById('result');
        if(resultEl) resultEl.textContent = '';
        requestAnimationFrame(gameLoop);
    }
}

function gameLoop() {
    if (spinning) {
        // Atualiza rotação da roleta
        wheelRotation += spinSpeed;
        // Atualiza ângulo da bolinha e aplica desaceleração (atração/atrito)
        ballAngle += ballSpeed;
        ballSpeed *= 0.99; // desaceleração gradual
        
        // Caso a velocidade da bolinha seja muito baixa, encerra a animação
        if (ballSpeed < 0.001) {
            ballSpeed = 0;
            spinning = false;
            // Normaliza o ângulo para [0, 2PI)
            const normalizedAngle = ((ballAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
            const pocketSize = (2 * Math.PI) / ROULETTE_NUMBERS.length;
            const winningIndex = Math.floor(normalizedAngle / pocketSize);
            const winningNumber = ROULETTE_NUMBERS[winningIndex];
            displayWinningNumber(winningNumber);
        }
        
        drawWheel();
        requestAnimationFrame(gameLoop);
    }
}

document.getElementById('spinButton').addEventListener('click', startSpin);