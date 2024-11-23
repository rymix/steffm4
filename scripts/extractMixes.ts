const fs = require("fs");
const path = require("path");

// Input file path
const inputFile = "db/mixes.json";
// Directory to store individual mix files
const outputDir = "mixes";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Read the JSON file
const data = JSON.parse(fs.readFileSync(inputFile, "utf8"));

// Extract mixes and write each to its own file
data.mixes.forEach((mix) => {
  const fileName = `${mix.mixcloudKey}.json`;
  const filePath = path.join(outputDir, fileName);
  fs.writeFileSync(filePath, JSON.stringify(mix, null, 2), "utf8");
});

console.log(
  `Extracted ${data.mixes.length} mixes to the "${outputDir}" folder.`,
);

// Generate new `mixes.ts` file
const mixesTsContent = `export const mixes = [\n${data.mixes
  .map((mix) => `  require('./mixes/${mix.mixcloudKey}.json')`)
  .join(",\n")}\n];\n`;

fs.writeFileSync("mixes.ts", mixesTsContent, "utf8");
console.log('Generated "mixes.ts" file.');

