module.exports = {
  moduleDirectories: ["<rootDir>", "node_modules"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"], // Updated to include the setup file for global fetch mock
  testEnvironment: "jest-environment-jsdom",
  modulePathIgnorePatterns: ["<rootDir>/.next/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  // Add TypeScript extensions if not already included
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
