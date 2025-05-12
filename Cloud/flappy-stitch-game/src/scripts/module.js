module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
    moduleFileExtensions: ['js'],
    setupFiles: ['jest-canvas-mock'],
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/scripts/**/*.js',
        '!src/scripts/**/*.test.js'
    ]
};
