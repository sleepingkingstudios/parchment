module.exports = {
  moduleDirectories: [
    'app/javascript',
    'node_modules',
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/app/javascript/__mocks__/styleMock.js',
  },
  modulePathIgnorePatterns: ['<rootDir>/.*/__mocks__'], // Avoid "duplicate manual mock" warnings
  setupFilesAfterEnv: ['./app/javascript/setupTests'],
  testPathIgnorePatterns: [
    '/config/',
    '/node_modules/',
    '/vendor/',
  ],
  verbose: true,
};
