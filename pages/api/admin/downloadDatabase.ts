import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { authenticateToken } from "pages/admin/middleware/auth";
import path from "path";

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  const filePath = path.join(process.cwd(), "db", "mixes.json");

  if (fs.existsSync(filePath)) {
    res.setHeader("Content-Disposition", "attachment; filename=db.json");
    res.setHeader("Content-Type", "application/json");

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } else {
    res.status(404).json({ error: "File not found" });
  }
};

export default authenticateToken(handler);