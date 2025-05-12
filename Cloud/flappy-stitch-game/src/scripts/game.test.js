describe('Flappy Stitch Game Tests', () => {
    let mockCanvas;
    let mockContext;

    beforeEach(() => {
        // Mock canvas and context
        mockCanvas = {
            width: 400,
            height: 600,
            getContext: jest.fn()
        };

        mockContext = {
            fillRect: jest.fn(),
            clearRect: jest.fn(),
            fillStyle: '',
            beginPath: jest.fn(),
            arc: jest.fn(),
            fill: jest.fn()
        };

        mockCanvas.getContext.mockReturnValue(mockContext);
        global.document = {
            getElementById: jest.fn().mockReturnValue(mockCanvas)
        };
    });

    test('Stitch should fall due to gravity', () => {
        const initialY = 150;
        stitch.y = initialY;
        stitch.update();
        expect(stitch.y).toBeGreaterThan(initialY);
    });

    test('Stitch should move upward when flapping', () => {
        const initialY = 150;
        stitch.y = initialY;
        stitch.flap();
        stitch.update();
        expect(stitch.y).toBeLessThan(initialY);
    });

    test('Game should end when Stitch hits the ground', () => {
        stitch.y = mockCanvas.height;
        stitch.update();
        expect(isGameOver).toBeTruthy();
    });

    test('Score should increase when passing pipes', () => {
        const initialScore = score;
        const pipe = {
            x: stitch.x - 1,
            passed: false
        };
        pipes.position = [pipe];
        pipes.update();
        expect(score).toBe(initialScore + 1);
    });
});
