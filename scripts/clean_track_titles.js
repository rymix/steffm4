#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// dseg14 font supports: A-Z, 0-9, space, period (.), comma (,), colon (:), semicolon (;),
// apostrophe ('), question mark (?), exclamation mark (!), ampersand (&)
const DSEG14_ALLOWED = /^[A-Z0-9 .,:;'?!&-]*$/i;

// Track cleaning statistics
let stats = {
  totalTracksProcessed: 0,
  tracksCleaned: 0,
  filesProcessed: 0,
  changes: [],
  timeIssues: [],
};

function cleanTrackTitle(title) {
  if (!title || title === "Unknown") return title;

  let cleaned = title;
  let hasChanges = false;

  // Step 1: Handle parentheses - remove them and content inside
  const originalParens = cleaned;
  cleaned = cleaned.replace(/\([^)]*\)/g, "").trim();
  if (cleaned !== originalParens) hasChanges = true;

  // Step 2: Handle square brackets - remove them and content inside
  const originalBrackets = cleaned;
  cleaned = cleaned.replace(/\[[^\]]*\]/g, "").trim();
  if (cleaned !== originalBrackets) hasChanges = true;

  // Step 3: Replace forward slashes with " - " (spaced hyphens as required)
  const originalSlash = cleaned;
  cleaned = cleaned.replace(/\//g, " - ");
  if (cleaned !== originalSlash) hasChanges = true;

  // Step 4: Handle hyphens - ensure they are spaced (word-word becomes word - word)
  const originalHyphen = cleaned;
  cleaned = cleaned.replace(/(\w)-(\w)/g, "$1 - $2");
  if (cleaned !== originalHyphen) hasChanges = true;

  // Step 5: Remove asterisks
  const originalAsterisk = cleaned;
  cleaned = cleaned.replace(/\*/g, "");
  if (cleaned !== originalAsterisk) hasChanges = true;

  // Step 6: Remove other unsupported characters (keep only dseg14 supported ones)
  const originalUnsupported = cleaned;
  cleaned = cleaned.replace(/[^A-Z0-9 .,:;'?!&-]/gi, "");
  if (cleaned !== originalUnsupported) hasChanges = true;

  // Step 7: Clean up multiple spaces
  const originalSpaces = cleaned;
  cleaned = cleaned.replace(/\s+/g, " ").trim();
  if (cleaned !== originalSpaces) hasChanges = true;

  // Step 8: Handle "feat." abbreviations - replace with "feat"
  const originalFeat = cleaned;
  cleaned = cleaned.replace(/\bfeat\./gi, "feat");
  if (cleaned !== originalFeat) hasChanges = true;

  return { cleaned, hasChanges };
}

function timeToMinutes(timeStr) {
  if (!timeStr) return 0;
  const parts = timeStr.split(":").map(Number);
  if (parts.length === 2) {
    return parts[0] + parts[1] / 60;
  } else if (parts.length === 3) {
    return parts[0] * 60 + parts[1] + parts[2] / 60;
  }
  return 0;
}

function checkTimeChronology(tracks, mixName) {
  const issues = [];
  for (let i = 1; i < tracks.length; i++) {
    const prevTime = timeToMinutes(tracks[i - 1].startTime);
    const currTime = timeToMinutes(tracks[i].startTime);

    if (currTime <= prevTime) {
      issues.push({
        mixName,
        trackIndex: i,
        previousTrack: tracks[i - 1].trackName,
        previousTime: tracks[i - 1].startTime,
        currentTrack: tracks[i].trackName,
        currentTime: tracks[i].startTime,
      });
    }
  }
  return issues;
}

function processFile(filePath) {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    if (!data.tracks || !Array.isArray(data.tracks)) {
      console.log(
        `Skipping ${path.basename(filePath)} - no tracks array found`,
      );
      return;
    }

    let fileChanged = false;
    const mixName = data.name || path.basename(filePath, ".json");

    // Check time chronology
    const timeIssues = checkTimeChronology(data.tracks, mixName);
    stats.timeIssues.push(...timeIssues);

    // Process each track
    data.tracks.forEach((track, index) => {
      stats.totalTracksProcessed++;

      if (track.trackName) {
        const result = cleanTrackTitle(track.trackName);

        if (result.hasChanges) {
          stats.changes.push({
            file: path.basename(filePath),
            mixName,
            trackIndex: index + 1,
            original: track.trackName,
            cleaned: result.cleaned,
          });

          track.trackName = result.cleaned;
          stats.tracksCleaned++;
          fileChanged = true;
        }
      }
    });

    // Write back the file if changes were made
    if (fileChanged) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`Updated ${path.basename(filePath)}`);
    }

    stats.filesProcessed++;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

function main() {
  const mixesDir = "/Users/steve.a/Node/steffm4/db/mixes";

  console.log("Starting track title cleaning process...\n");

  // Get all JSON files
  const files = fs
    .readdirSync(mixesDir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => path.join(mixesDir, file));

  console.log(`Found ${files.length} mix files to process\n`);

  // Process each file
  files.forEach(processFile);

  // Generate report
  console.log("\n=== CLEANING REPORT ===");
  console.log(`Files processed: ${stats.filesProcessed}`);
  console.log(`Total tracks processed: ${stats.totalTracksProcessed}`);
  console.log(`Tracks cleaned: ${stats.tracksCleaned}`);
  console.log(
    `Files modified: ${
      stats.changes.reduce((acc, change) => {
        const files = new Set(acc);
        files.add(change.file);
        return Array.from(files);
      }, []).length
    }`,
  );

  console.log("\n=== SAMPLE CHANGES ===");
  stats.changes.slice(0, 20).forEach((change) => {
    console.log(`${change.file} - Track ${change.trackIndex}:`);
    console.log(`  Before: "${change.original}"`);
    console.log(`  After:  "${change.cleaned}"`);
    console.log("");
  });

  if (stats.changes.length > 20) {
    console.log(`... and ${stats.changes.length - 20} more changes`);
  }

  console.log("\n=== TIME CHRONOLOGY ISSUES ===");
  if (stats.timeIssues.length === 0) {
    console.log("No chronological issues found!");
  } else {
    console.log(`Found ${stats.timeIssues.length} chronological issues:`);
    stats.timeIssues.forEach((issue) => {
      console.log(`${issue.mixName}:`);
      console.log(
        `  Track ${issue.trackIndex}: "${issue.currentTrack}" (${issue.currentTime})`,
      );
      console.log(
        `  Previous: "${issue.previousTrack}" (${issue.previousTime})`,
      );
      console.log("");
    });
  }

  // Save detailed report
  const reportPath = "/Users/steve.a/Node/steffm4/track_cleaning_report.json";
  fs.writeFileSync(reportPath, JSON.stringify(stats, null, 2));
  console.log(`\nDetailed report saved to: ${reportPath}`);
}

if (require.main === module) {
  main();
}
