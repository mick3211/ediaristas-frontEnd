module.exports = {
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/.next'],
    moduleDirectories: ['node_modules', 'src'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/bebel-jest',
    },
    setFilesAfterEnv: ['<rootDir>/setupTests.js'],
};
