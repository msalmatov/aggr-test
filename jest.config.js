/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testTimeout: 5000,
    testPathIgnorePatterns: [
        '<rootDir>/somepath/to-ignore-if-any/',
    ],
    moduleFileExtensions: ['js', 'ts', 'json'],
    roots: ['<rootDir>'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
};