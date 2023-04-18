module.exports = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },
  testMatch: ["**/*.test.(js|jsx|ts|tsx)"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "server/**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/path/to/other/ignored/directories/**",
  ],
};