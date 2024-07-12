import axios from "axios";
import { db, initializeDb } from "db";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (req.method === "POST") {
    await initializeDb();
    const { artistName, trackName, mixcloudKey, sectionNumber } = req.body;

    try {
      const url = `https://api.discogs.com/database/search?q=${encodeURIComponent(
        `${artistName} ${trackName}`,
      )}&token=${process.env.NEXT_PUBLIC_DISCOGS_API_TOKEN}`;
      const response = await axios.get(url);

      let coverArt;
      coverArt =
        response.data.results && response.data.results.length > 0
          ? {
              coverArtDate: new Date().toISOString(),
              coverArtLarge: response.data.results[0].cover_image,
              coverArtSmall: response.data.results[0].thumb,
            }
          : {
              coverArtDate: new Date().toISOString(),
              coverArtLarge: "/images/tracklist-placeholder.png",
              coverArtSmall: "/images/tracklist-placeholder.png",
            };

      const mixIndex = db.data?.mixes.findIndex(
        (mix) => mix.mixcloudKey === mixcloudKey,
      );

      if (mixIndex === -1 || mixIndex === undefined) {
        res.status(404).json({ message: "Mix not found" });
        return;
      }

      const trackIndex = db.data?.mixes[mixIndex].tracks.findIndex(
        (track) => track.sectionNumber === sectionNumber,
      );

      if (trackIndex !== -1 && trackIndex !== undefined) {
        db.data.mixes[mixIndex].tracks[trackIndex] = {
          ...db.data.mixes[mixIndex].tracks[trackIndex],
          ...coverArt,
        };

        await db.write();
      } else {
        res.status(404).json({ message: "Track not found" });
        return;
      }

      res.status(200).json(coverArt);
    } catch (error) {
      console.error("Error fetching cover art:", error);
      res.status(500).json({ message: "Failed to fetch cover art" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
