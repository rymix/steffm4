// pages/api/admin/uploadDatabase.ts

/* eslint-disable consistent-return */
import fs from "fs";
import multiparty from "multiparty";
import { NextApiRequest, NextApiResponse } from "next";
import { authenticateToken } from "pages/admin/middleware/auth";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // Disable the built-in body parser
  },
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = new multiparty.Form();

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("Error parsing form:", err);
      return res.status(500).json({ error: "Failed to upload file" });
    }

    const file = files.file[0];
    const oldPath = file.path;
    const newPath = path.join(process.cwd(), "db", "mixes.json");

    fs.rename(oldPath, newPath, () => {
      if (err) {
        console.error("Error renaming file:", err);
        return res
          .status(500)
          .json({ error: "Failed to replace database file" });
      }

      res.status(200).json({ message: "Database successfully replaced" });
    });
  });
};

export default authenticateToken(handler);
