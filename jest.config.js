module.exports = {
  setupFilesAfterEnv: ['./app/javascript/setupTests'],
  testPathIgnorePatterns: [
    '/config/',
    '/node_modules/',
    '/vendor/',
  ],
  verbose: true,
};
