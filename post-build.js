const fs = require("fs-extra");
const path = require("path");

const staticSrcPath = path.join(__dirname, ".next/static");
const staticDestPath = path.join(
  __dirname,
  ".next/standalone/steffm3/steffm3/.next/static",
);

fs.copy(staticSrcPath, staticDestPath)
  .then(() => console.log("Static files copied successfully."))
  .catch((error) => console.error("Error copying static files:", error));

const publicSrcPath = path.join(__dirname, "public");
const publicDestPath = path.join(
  __dirname,
  ".next/standalone/steffm3/steffm3/public",
);

fs.copy(publicSrcPath, publicDestPath)
  .then(() => console.log("Public files copied successfully."))
  .catch((error) => console.error("Error copying public files:", error));
