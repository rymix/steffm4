import axios from "axios";
import { db, initializeDb } from "db";
import type { NextApiRequest, NextApiResponse } from "next";
import { authenticateToken } from "pages/admin/middleware/auth";
import { mcKeyFormatter } from "utils/functions";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (req.method === "POST") {
    await initializeDb();
    const { mixcloudKey } = req.body;

    const mixIndex = db.data?.mixes.findIndex(
      (mix) => mix.mixcloudKey === mixcloudKey,
    );

    if (mixIndex === -1 || mixIndex === undefined) {
      res.status(404).json({ message: "Mix not found" });
      return;
    }

    try {
      const response = await axios.get(
        `https://api.mixcloud.com${mcKeyFormatter(mixcloudKey)}`,
      );

      // Verify and extract the required data
      const { pictures } = response.data;
      if (!pictures) {
        throw new Error("Pictures data not found in the response");
      }

      const coverArtLarge = pictures.extra_large;
      const coverArtSmall = pictures.thumbnail;
      const coverArtDate = new Date().toISOString();

      // Update the database with the new cover art data
      db.data.mixes[mixIndex].coverArtLarge = coverArtLarge;
      db.data.mixes[mixIndex].coverArtSmall = coverArtSmall;
      db.data.mixes[mixIndex].coverArtDate = coverArtDate;

      await db.write();

      res.status(200).json({
        mixcloudKey,
        coverArtLarge,
        coverArtSmall,
        coverArtDate,
      });
    } catch (error) {
      console.error("Error fetching cover art:", error); // Log the error to debug
      res.status(500).json({ message: "Failed to fetch cover art" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default authenticateToken(handler);
