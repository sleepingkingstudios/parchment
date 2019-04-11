module.exports = {
  setupFilesAfterEnv: ['./app/javascript/setupTests'],
  testPathIgnorePatterns: [
    '/config/',
    '/node_modules/',
  ],
  verbose: true,
};
