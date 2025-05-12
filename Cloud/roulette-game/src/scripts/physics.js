import { WHEEL_RADIUS, BALL_RADIUS } from './constants.js';

export function calculateTrajectory(initialVelocity, angle) {
    const g = 9.81; // acceleration due to gravity in m/s²
    const radians = angle * (Math.PI / 180); // convert angle to radians

    const timeOfFlight = (2 * initialVelocity * Math.sin(radians)) / g;
    const horizontalDistance = initialVelocity * Math.cos(radians) * timeOfFlight;

    return {
        timeOfFlight: timeOfFlight,
        horizontalDistance: horizontalDistance
    };
}

export function applyGravity(ball) {
    const g = 9.81; // acceleration due to gravity in m/s²
    ball.velocity.y -= g * ball.deltaTime; // update vertical velocity
    ball.position.y += ball.velocity.y * ball.deltaTime; // update position
}

export function calculateBallPosition(angle, radius) {
    return {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle)
    };
}