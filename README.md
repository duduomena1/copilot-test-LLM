# AI-Generated Game Projects

This repository contains multiple game projects generated using different AI assistants, demonstrating their capabilities and limitations in game development.

## Projects Overview

### 1. Roulette Game (Multiple Versions)

#### Version 1 - GitHub Copilot o3-mini
- Location: `/o1/roulette-game/`
- Features:
  - Basic roulette wheel implementation
  - Simple physics simulation
  - Score tracking

#### Version 2 - Cloud Implementation - Claude 3.5 Sonnet
- Location: `/Cloud/roulette-game/`
- Features:
  - Advanced physics simulation
  - Modular code structure
  - Enhanced UI/UX

### 2. Flappy Bird Game (Multiple Attempts)

#### Successful Implementation - GitHub Copilot - o3-mini
- Location: `/o1/flapbird/`
- Features:
  - Stitch character implementation
  - Obstacle generation
  - Score tracking
  - Collision detection

#### Cloud Version - GitHub Copilot
- Location: `/Cloud/flappy-stitch-game/`
- Features:
  - Enhanced graphics
  - Improved physics
  - Better code organization

#### Failed Attempt - Gemini 2.0
- **Note**: Gemini 2.0 was unable to generate a working version of the FlappyBird game
- The AI struggled with implementing proper game physics and collision detection

## AI Tools Used and Their Performance

### GitHub Copilot (o3-mini)
- **Strengths**:
  - Excellent at generating game logic
  - Good understanding of physics implementations
  - Clean code structure
  - Successful with both Roulette and FlappyBird implementations

### Claude 3.5 Sonnet
- **Strengths**:
  - Advanced modular code organization
  - Sophisticated physics calculations
  - Clean and maintainable code structure
  - Successful with Roulette game implementation

### Gemini 2.0
- **Attempted Implementation**:
  - Roulette game attempt
  - Basic game structure generation
  - Simple UI components
- **Limitations**:
  - Unable to generate a working FlappyBird game
  - Struggled with complex game physics
  - Limited success with interactive game elements
  - Inconsistent code quality
  - Difficulty with canvas animations

## Project Structure
```
copilot-test-LLM/
├── o1/
│   ├── roulette-game/
│   └── flapbird/
└── Cloud/
    ├── roulette-game/
    └── flappy-stitch-game/
```

## Getting Started

Each game project includes its own README with specific instructions for running and testing the game.

## Conclusions

This project demonstrates that while AI tools are becoming increasingly capable of generating game code, their abilities vary significantly. GitHub Copilot proved to be the most reliable for game development, while Gemini 2.0 showed limitations in handling complex game mechanics.
