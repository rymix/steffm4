import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { authenticateToken } from "pages/admin/middleware/auth";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // Disable the built-in body parser
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const formidable = (await import("formidable")).default;
  const form = new formidable.IncomingForm();
  const uploadDir = path.join(process.cwd(), "db");

  form.uploadDir = uploadDir;
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Failed to upload file" });
    }

    const oldPath = files.file.path;
    const newPath = path.join(uploadDir, "db.json");

    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Failed to replace database file" });
      }

      res.status(200).json({ message: "Database successfully replaced" });
    });
  });
};

export default authenticateToken(handler);
