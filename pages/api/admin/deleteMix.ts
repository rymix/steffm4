// pages/api/admin/deleteMix.ts

import { db, initializeDb } from "db";
import type { NextApiRequest, NextApiResponse } from "next";
import { authenticateToken } from "pages/admin/middleware/auth";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (req.method === "POST") {
    await initializeDb();
    const { fileName } = req.body;

    const mixIndex = db.data?.mixes.findIndex(
      (mix) => mix.fileName === fileName,
    );
    if (mixIndex === -1 || mixIndex === undefined) {
      res.status(404).json({ message: "Mix not found" });
      return;
    }

    db.data.mixes.splice(mixIndex, 1);
    await db.write();

    res.status(200).json({ message: "Mix deleted successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default authenticateToken(handler);
