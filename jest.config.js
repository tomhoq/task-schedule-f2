// jest.config.js
export default {
    transform: {
      '^.+\\.js$': 'babel-jest', // Transform .js files with Babel
    },
    testEnvironment: 'node', // or 'jsdom' if you're testing in a browser-like environment
};
  