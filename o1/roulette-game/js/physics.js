function calculateRotationSpeed(initialSpeed, deceleration, time) {
    return initialSpeed - (deceleration * time);
}

function calculateBallPosition(initialPosition, speed, time) {
    return initialPosition + (speed * time) - (0.5 * 9.81 * time * time);
}

function simulateRouletteSpin(initialSpeed, deceleration, time) {
    let currentSpeed = calculateRotationSpeed(initialSpeed, deceleration, time);
    let ballInitialPosition = 0; // Starting position of the ball
    let ballPosition = calculateBallPosition(ballInitialPosition, currentSpeed, time);
    
    return {
        currentSpeed: currentSpeed,
        ballPosition: ballPosition
    };
}