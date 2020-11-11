/*
  File to config jest to work with
  MongoDB memory server.

  No need to change it.
*/

module.exports = {
  preset: '@shelf/jest-mongodb',
  collectCoverage: true,
  collectCoverageFrom: ['**/src/graphql/resolvers/**', '!**/src/graphql/resolvers/**/__tests__/**'],
  coverageReporters: ['text', 'html'],
  modulePathIgnorePatterns: ['.__mocks__.*'],
  testMatch: ['**/__tests__/**/*.test.js'],
};
