// pages/api/admin/generateDatabase.ts

/* eslint-disable unicorn/text-encoding-identifier-case */

import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

// Paths to the files and folders
const dbPath = path.resolve(process.cwd(), "db");
const mixesPath = path.resolve(dbPath, "./mixes");
const outputFilePath = path.resolve(dbPath, "./mixes.json");

// Static files
const staticFiles = {
  backgroundCategories: path.resolve(dbPath, "./backgroundCategories.json"),
  backgrounds: path.resolve(dbPath, "./backgrounds.json"),
  categories: path.resolve(dbPath, "./categories.json"),
};

// Helper function to read and parse a JSON file
const readJSONFile = (filePath: string): any => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return [];
  }
};

const generateDatabase = (): { [key: string]: any } => {
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
  return {
    backgroundCategories,
    backgrounds,
    categories,
    mixes,
  };
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (req.method === "POST") {
    try {
      // Generate the database object
      const database = generateDatabase();

      // Write the combined database to the output file
      fs.writeFileSync(
        outputFilePath,
        JSON.stringify(database, null, 2),
        "utf-8",
      );

      console.log(`Database generated at ${outputFilePath}`);
      res.status(200).json({
        message: "Database generated successfully",
        outputFilePath,
      });
    } catch (error) {
      console.error("Error generating database:", error);
      res.status(500).json({ message: "Failed to generate database" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
