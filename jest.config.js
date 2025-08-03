module.exports = {
  preset: "ts-jest/presets/js-with-ts",
  moduleDirectories: ["node_modules", "<rootDir>"], // Custom directories
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"], // Correct path for setup file
  testEnvironment: "jest-environment-jsdom",
  modulePathIgnorePatterns: ["<rootDir>/.next/"], // Ignore build directory
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
        },
      },
    ], // Use ts-jest for TypeScript files with modern config
    "^.+\\.(js|jsx)$": "babel-jest", // Use babel-jest for JS files (if needed)
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"], // Extensions to handle
  transformIgnorePatterns: [
    "/node_modules/(?!(jest-fetch-mock)/)", // Allow jest-fetch-mock to be transformed
  ],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"], // Test file pattern
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/index.ts", // Exclude certain files from coverage
    "!**/.next/**",
    "!**/node_modules/**",
    "!**/coverage/**",
  ],
};
