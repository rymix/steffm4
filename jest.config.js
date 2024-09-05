module.exports = {
  moduleDirectories: ["node_modules", "<rootDir>", "<rootDir>/src"], // Custom directories
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"], // Correct path for setup file
  testEnvironment: "jest-environment-jsdom",
  modulePathIgnorePatterns: ["<rootDir>/.next/"], // Ignore build directory
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // Use babel-jest for JS/TS files
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"], // Extensions to handle
  transformIgnorePatterns: ["/node_modules/"], // Ignore node_modules
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"], // Test file pattern
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/index.ts", // Exclude certain files from coverage
  ],
};
