// pages/api/admin/updateMixcloudCoverArt.ts

import axios from "axios";
import { db, initializeDb } from "db";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
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
      // Fetch cover art data from Mixcloud
      const response = await axios.get(
        `https://api.mixcloud.com${mcKeyFormatter(mixcloudKey)}`,
      );

      const { pictures } = response.data;
      if (!pictures) {
        throw new Error("Pictures data not found in the response");
      }

      const coverArtLarge = pictures.extra_large;
      const coverArtSmall = pictures.thumbnail;
      const coverArtDate = new Date().toISOString();

      // Update the aggregated mixes.json file
      db.data.mixes[mixIndex].coverArtLarge = coverArtLarge;
      db.data.mixes[mixIndex].coverArtSmall = coverArtSmall;
      db.data.mixes[mixIndex].coverArtDate = coverArtDate;

      await db.write();

      // Update the individual mix file
      const mixFilePath = path.join(
        process.cwd(),
        "db/mixes",
        `${mixcloudKey}.json`,
      );

      if (fs.existsSync(mixFilePath)) {
        const mixData = JSON.parse(fs.readFileSync(mixFilePath, "utf8"));
        mixData.coverArtLarge = coverArtLarge;
        mixData.coverArtSmall = coverArtSmall;
        mixData.coverArtDate = coverArtDate;

        fs.writeFileSync(mixFilePath, JSON.stringify(mixData, null, 2));
      } else {
        console.warn(`Mix file not found for key: ${mixcloudKey}`);
      }

      res.status(200).json({
        mixcloudKey,
        coverArtLarge,
        coverArtSmall,
        coverArtDate,
      });
    } catch (error) {
      console.error("Error fetching cover art:", error);
      res.status(500).json({ message: "Failed to fetch cover art" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
