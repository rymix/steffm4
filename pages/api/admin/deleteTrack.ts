// pages/api/admin/deleteTrack.ts

import { db, initializeDb } from "db";
import type { NextApiRequest, NextApiResponse } from "next";
import { authenticateToken } from "pages/admin/middleware/auth";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (req.method === "POST") {
    await initializeDb();
    const { mixcloudKey, sectionNumber } = req.body;

    const mixIndex = db.data?.mixes.findIndex(
      (mix) => mix.mixcloudKey === mixcloudKey,
    );

    if (mixIndex !== -1 && mixIndex !== undefined) {
      const mix = db.data.mixes[mixIndex];
      mix.tracks = mix.tracks.filter(
        (track) => track.sectionNumber !== sectionNumber,
      );

      db.data.mixes[mixIndex] = mix;
      await db.write();
      res.status(200).json({ message: "Track deleted successfully" });
    } else {
      res.status(404).json({ message: "Mix not found" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default authenticateToken(handler);
