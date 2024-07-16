import { readFileSync } from "fs";
import { createServer } from "https";
import next from "next";
import { dirname, join } from "path";
import { fileURLToPath, parse } from "url";

// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: readFileSync(join(__dirname, "localhost-key.pem")),
  cert: readFileSync(join(__dirname, "localhost-cert.pem")),
};

await app.prepare();

createServer(httpsOptions, (req, res) => {
  const parsedUrl = parse(req.url, true);
  handle(req, res, parsedUrl);
}).listen(3001, (err) => {
  if (err) throw err;
  console.log("> Server started on https://localhost:3001");
});
