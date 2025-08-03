const fs = require("fs");
const path = require("path");

// Function to clean track titles
function cleanTrackTitle(title) {
  if (!title || typeof title !== "string") return title;

  let cleaned = title;

  // 1. Replace accented characters with English equivalents
  const accentMap = {
    à: "a",
    á: "a",
    â: "a",
    ã: "a",
    ä: "a",
    å: "a",
    è: "e",
    é: "e",
    ê: "e",
    ë: "e",
    ì: "i",
    í: "i",
    î: "i",
    ï: "i",
    ò: "o",
    ó: "o",
    ô: "o",
    õ: "o",
    ö: "o",
    ù: "u",
    ú: "u",
    û: "u",
    ü: "u",
    ñ: "n",
    ç: "c",
    À: "A",
    Á: "A",
    Â: "A",
    Ã: "A",
    Ä: "A",
    Å: "A",
    È: "E",
    É: "E",
    Ê: "E",
    Ë: "E",
    Ì: "I",
    Í: "I",
    Î: "I",
    Ï: "I",
    Ò: "O",
    Ó: "O",
    Ô: "O",
    Õ: "O",
    Ö: "O",
    Ù: "U",
    Ú: "U",
    Û: "U",
    Ü: "U",
    Ñ: "N",
    Ç: "C",
  };

  for (const [accented, plain] of Object.entries(accentMap)) {
    cleaned = cleaned.replace(new RegExp(accented, "g"), plain);
  }

  // 2. Replace $ with s
  cleaned = cleaned.replace(/\$/g, "s");

  // 3. Replace square brackets with parentheses
  cleaned = cleaned.replace(/\[/g, "(");
  cleaned = cleaned.replace(/\]/g, ")");

  // 4. Fix ALL hyphens - replace with space-hyphen-space
  // Handle different types of dashes: regular hyphen, en dash, em dash
  cleaned = cleaned.replace(/[-–—]/g, " - ");

  // 5. Clean up multiple spaces that might result from replacements
  cleaned = cleaned.replace(/\s+/g, " ");

  // 6. Trim trailing/leading spaces
  cleaned = cleaned.trim();

  return cleaned;
}

// Function to convert time string to seconds for comparison
function timeToSeconds(timeStr) {
  if (!timeStr) return 0;
  const parts = timeStr.split(":");
  if (parts.length === 2) {
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  } else if (parts.length === 3) {
    return (
      parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2])
    );
  }
  return 0;
}

// Main processing function
function processDatabase() {
  const report = {
    filesProcessed: 0,
    tracksProcessed: 0,
    tracksModified: 0,
    examples: [],
    timeIssues: [],
  };

  // Process main mixes.json file
  console.log("Processing main mixes.json file...");
  const mainFilePath = "/Users/steve.a/Node/steffm4/db/mixes.json";

  try {
    const mainData = JSON.parse(fs.readFileSync(mainFilePath, "utf8"));
    let mainFileModified = false;

    if (mainData.mixes && Array.isArray(mainData.mixes)) {
      for (const mix of mainData.mixes) {
        if (mix.tracks && Array.isArray(mix.tracks)) {
          // Check time progression
          let prevTime = -1;
          for (let i = 0; i < mix.tracks.length; i++) {
            const track = mix.tracks[i];
            const currentTime = timeToSeconds(track.startTime);

            if (currentTime <= prevTime && i > 0) {
              report.timeIssues.push({
                mixName: mix.name || mix.mixcloudKey,
                trackIndex: i,
                trackName: track.trackName,
                startTime: track.startTime,
                previousTime: mix.tracks[i - 1].startTime,
              });
            }
            prevTime = currentTime;

            // Clean track title
            report.tracksProcessed++;
            const originalTitle = track.trackName;
            const cleanedTitle = cleanTrackTitle(originalTitle);

            if (originalTitle !== cleanedTitle) {
              track.trackName = cleanedTitle;
              report.tracksModified++;
              mainFileModified = true;

              if (report.examples.length < 10) {
                report.examples.push({
                  before: originalTitle,
                  after: cleanedTitle,
                });
              }
            }
          }
        }
      }
    }

    if (mainFileModified) {
      fs.writeFileSync(mainFilePath, JSON.stringify(mainData, null, 2));
      report.filesProcessed++;
    }
  } catch (error) {
    console.error("Error processing main mixes.json:", error.message);
  }

  // Process individual mix files
  console.log("Processing individual mix files...");
  const mixesDir = "/Users/steve.a/Node/steffm4/db/mixes";
  const files = fs
    .readdirSync(mixesDir)
    .filter((file) => file.endsWith(".json"));

  for (const filename of files) {
    const filePath = path.join(mixesDir, filename);

    try {
      const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
      let fileModified = false;

      if (data.tracks && Array.isArray(data.tracks)) {
        // Check time progression
        let prevTime = -1;
        for (let i = 0; i < data.tracks.length; i++) {
          const track = data.tracks[i];
          const currentTime = timeToSeconds(track.startTime);

          if (currentTime <= prevTime && i > 0) {
            report.timeIssues.push({
              mixName: data.name || filename,
              trackIndex: i,
              trackName: track.trackName,
              startTime: track.startTime,
              previousTime: data.tracks[i - 1].startTime,
            });
          }
          prevTime = currentTime;

          // Clean track title
          report.tracksProcessed++;
          const originalTitle = track.trackName;
          const cleanedTitle = cleanTrackTitle(originalTitle);

          if (originalTitle !== cleanedTitle) {
            track.trackName = cleanedTitle;
            report.tracksModified++;
            fileModified = true;

            if (report.examples.length < 10) {
              report.examples.push({
                before: originalTitle,
                after: cleanedTitle,
              });
            }
          }
        }
      }

      if (fileModified) {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        report.filesProcessed++;
      }
    } catch (error) {
      console.error(`Error processing ${filename}:`, error.message);
    }
  }

  return report;
}

// Run the cleanup
console.log("Starting database cleanup...");
const report = processDatabase();

console.log("\n=== CLEANUP REPORT ===");
console.log(`Files processed: ${report.filesProcessed}`);
console.log(`Total tracks checked: ${report.tracksProcessed}`);
console.log(`Tracks modified: ${report.tracksModified}`);

if (report.examples.length > 0) {
  console.log("\n=== EXAMPLE CHANGES ===");
  report.examples.forEach((example, index) => {
    console.log(`${index + 1}. "${example.before}" → "${example.after}"`);
  });
}

if (report.timeIssues.length > 0) {
  console.log("\n=== START TIME ISSUES ===");
  report.timeIssues.forEach((issue, index) => {
    console.log(`${index + 1}. Mix: ${issue.mixName}`);
    console.log(`   Track ${issue.trackIndex}: "${issue.trackName}"`);
    console.log(
      `   Time: ${issue.startTime} (previous: ${issue.previousTime})`,
    );
    console.log("");
  });
} else {
  console.log("\n=== START TIME ISSUES ===");
  console.log("No chronological issues found.");
}

console.log("Cleanup complete!");

// Write detailed report to JSON file
const detailedReport = {
  summary: {
    filesProcessed: report.filesProcessed,
    tracksProcessed: report.tracksProcessed,
    tracksModified: report.tracksModified,
    timestamp: new Date().toISOString(),
  },
  allChanges: [],
  timeIssues: report.timeIssues,
};

// We need to collect all changes, not just examples
// Let's re-run to collect all changes for the report
console.log("Generating detailed report...");

// Re-process to collect all changes
const mainFilePath = "/Users/steve.a/Node/steffm4/db/mixes.json";
try {
  const mainData = JSON.parse(fs.readFileSync(mainFilePath, "utf8"));
  if (mainData.mixes && Array.isArray(mainData.mixes)) {
    for (const mix of mainData.mixes) {
      if (mix.tracks && Array.isArray(mix.tracks)) {
        for (const track of mix.tracks) {
          const originalTitle = track.trackName;
          const cleanedTitle = cleanTrackTitle(originalTitle);
          if (originalTitle !== cleanedTitle) {
            detailedReport.allChanges.push({
              mixName: mix.name || mix.mixcloudKey,
              artistName: track.artistName,
              before: originalTitle,
              after: cleanedTitle,
              source: "mixes.json",
            });
          }
        }
      }
    }
  }
} catch (error) {
  console.error("Error in detailed report for mixes.json:", error.message);
}

// Process individual mix files for report
const mixesDir = "/Users/steve.a/Node/steffm4/db/mixes";
const files = fs.readdirSync(mixesDir).filter((file) => file.endsWith(".json"));

for (const filename of files) {
  const filePath = path.join(mixesDir, filename);
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (data.tracks && Array.isArray(data.tracks)) {
      for (const track of data.tracks) {
        const originalTitle = track.trackName;
        const cleanedTitle = cleanTrackTitle(originalTitle);
        if (originalTitle !== cleanedTitle) {
          detailedReport.allChanges.push({
            mixName: data.name || filename,
            artistName: track.artistName,
            before: originalTitle,
            after: cleanedTitle,
            source: filename,
          });
        }
      }
    }
  } catch (error) {
    console.error(`Error in detailed report for ${filename}:`, error.message);
  }
}

// Write the detailed report
fs.writeFileSync(
  "track_cleaning_report.json",
  JSON.stringify(detailedReport, null, 2),
);
console.log(
  `Detailed report written to track_cleaning_report.json (${detailedReport.allChanges.length} changes listed)`,
);
