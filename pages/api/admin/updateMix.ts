import { db, initializeDb } from "db";
import type { NextApiRequest, NextApiResponse } from "next";
import { authenticateToken } from "pages/admin/middleware/auth";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (req.method === "POST") {
    await initializeDb();
    const {
      category,
      coverArtDate,
      coverArtLarge,
      coverArtSmall,
      duration,
      fileName,
      listOrder,
      mixcloudKey,
      name,
      notes,
      releaseDate,
      shortName,
      tags,
      tracks, // Include tracks in the request body
    } = req.body;

    const mixIndex = db.data?.mixes.findIndex(
      (mix) => mix.mixcloudKey === mixcloudKey,
    );

    if (mixIndex !== -1 && mixIndex !== undefined) {
      // Update existing mix
      db.data.mixes[mixIndex] = {
        category: category.code, // Use category code only
        coverArtDate,
        coverArtLarge,
        coverArtSmall,
        duration,
        fileName,
        listOrder,
        mixcloudKey,
        name,
        notes,
        releaseDate,
        shortName,
        tags,
        tracks, // Ensure tracks are updated
      };
    } else {
      // Create new mix
      db.data.mixes.push({
        category: category.code, // Use category code only
        coverArtDate,
        coverArtLarge,
        coverArtSmall,
        duration,
        fileName,
        listOrder,
        mixcloudKey,
        name,
        notes,
        releaseDate,
        shortName,
        tags,
        tracks, // Ensure tracks are added
      });
    }

    await db.write();
    res.status(200).json({ message: "Mix updated successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default authenticateToken(handler);
