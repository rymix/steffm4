const fs = require("fs");
const path = require("path");

// Paths to the files and folders
const dbPath = path.resolve(__dirname, "../db");
const mixesPath = path.resolve(dbPath, "./mixes");
const outputFilePath = path.resolve(dbPath, "./mixes.json");

// Static files
const staticFiles = {
  backgroundCategories: path.resolve(dbPath, "./backgroundCategories.json"),
  backgrounds: path.resolve(dbPath, "./backgrounds.json"),
  categories: path.resolve(dbPath, "./categories.json"),
};

// Function to read and parse a JSON file
const readJSONFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return [];
  }
};

// Load static JSON data
const backgroundCategories = readJSONFile(staticFiles.backgroundCategories);
const backgrounds = readJSONFile(staticFiles.backgrounds);
const categories = readJSONFile(staticFiles.categories);

// Dynamically load mixes
const mixes = fs
  .readdirSync(mixesPath)
  .filter((file) => file.endsWith(".json")) // Only include .json files
  .map((file) => {
    const mixFilePath = path.resolve(mixesPath, file);
    return readJSONFile(mixFilePath); // Parse each mix file
  });

// Combine everything into the desired structure
const database = {
  backgroundCategories,
  backgrounds,
  categories,
  mixes,
};

// Write the result to a JSON file
fs.writeFileSync(outputFilePath, JSON.stringify(database, null, 2), "utf-8");
console.log(`Database generated at ${outputFilePath}`);
