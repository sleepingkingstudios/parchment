module.exports = {
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/app/javascript/__mocks__/styleMock.js',
  },
  setupFilesAfterEnv: ['./app/javascript/setupTests'],
  testPathIgnorePatterns: [
    '/config/',
    '/node_modules/',
    '/vendor/',
  ],
  verbose: true,
};
