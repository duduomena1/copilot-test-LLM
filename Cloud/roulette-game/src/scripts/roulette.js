import { ROULETTE_NUMBERS, WHEEL_RADIUS } from './constants.js';
import { SLOT_COLORS } from '../utils/constants.js';

export class RouletteWheel {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.angle = 0;
        this.isSpinning = false;
        this.init();
    }

    init() {
        this.draw();
        this.canvas.addEventListener('click', () => this.spin());
    }

    draw() {
        const ctx = this.ctx;
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // Clear canvas
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw outer ring
        ctx.beginPath();
        ctx.arc(centerX, centerY, WHEEL_RADIUS + 20, 0, 2 * Math.PI);
        ctx.fillStyle = '#4a4a4a';
        ctx.fill();
        ctx.stroke();
        
        // Draw wheel
        ROULETTE_NUMBERS.forEach((number, index) => {
            const slotAngle = (index * 2 * Math.PI) / ROULETTE_NUMBERS.length;
            const startAngle = slotAngle + this.angle;
            const endAngle = startAngle + (2 * Math.PI) / ROULETTE_NUMBERS.length;
            
            // Draw slot
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, WHEEL_RADIUS, startAngle, endAngle);
            ctx.closePath();
            
            // Fill slot
            ctx.fillStyle = SLOT_COLORS[number];
            ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.stroke();
            
            // Draw number
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(startAngle + Math.PI / ROULETTE_NUMBERS.length);
            ctx.translate(WHEEL_RADIUS - 30, 0);
            ctx.rotate(Math.PI / 2);
            ctx.fillStyle = 'white';
            ctx.font = '20px Arial';
            ctx.fillText(number.toString(), -10, 0);
            ctx.restore();
        });

        // Draw center circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, 50, 0, 2 * Math.PI);
        ctx.fillStyle = '#2a2a2a';
        ctx.fill();
        ctx.strokeStyle = 'gold';
        ctx.stroke();

        // Draw ball if spinning
        if (this.isSpinning) {
            const ballRadius = 10;
            const ballDistance = WHEEL_RADIUS - 40;
            const ballX = centerX + Math.cos(this.angle) * ballDistance;
            const ballY = centerY + Math.sin(this.angle) * ballDistance;
            
            ctx.beginPath();
            ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.strokeStyle = '#666';
            ctx.stroke();
        }
    }

    spin() {
        if (this.isSpinning) return;
        
        // Reset result display
        const resultDiv = document.getElementById('result');
        resultDiv.textContent = '';
        resultDiv.className = '';
        
        this.isSpinning = true;
        let speed = 0.3;
        let deceleration = 0.001;
        
        const animate = () => {
            this.angle += speed;
            speed -= deceleration;
            this.draw();

            if (speed > 0) {
                requestAnimationFrame(animate);
            } else {
                this.isSpinning = false;
                const winningNumber = this.getWinningNumber();
                this.showResult(winningNumber);
            }
        };
        
        animate();
    }

    getWinningNumber() {
        const normalizedAngle = ((this.angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        const index = Math.floor(ROULETTE_NUMBERS.length - (normalizedAngle / (2 * Math.PI) * ROULETTE_NUMBERS.length)) % ROULETTE_NUMBERS.length;
        return ROULETTE_NUMBERS[index];
    }

    showResult(number) {
        const resultDiv = document.getElementById('result');
        resultDiv.textContent = `Winner: ${number}`;
        resultDiv.className = 'result-animation';
        resultDiv.style.color = SLOT_COLORS[number];
        
        // Draw final ball position
        this.draw();
    }
}