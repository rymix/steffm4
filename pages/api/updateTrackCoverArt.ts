import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (req.method === "POST") {
    const { artistName, trackName } = req.body;

    try {
      const url = `https://api.discogs.com/database/search?q=${encodeURIComponent(
        `${artistName} ${trackName}`,
      )}&token=${process.env.NEXT_PUBLIC_DISCOGS_API_TOKEN}`;
      const response = await axios.get(url);

      if (response.data.results && response.data.results.length > 0) {
        const coverArt = response.data.results[0];
        res.status(200).json({
          coverArtDate: new Date().toISOString(),
          coverArtLarge: coverArt.cover_image,
          coverArtSmall: coverArt.thumb,
        });
      } else {
        res.status(200).json({
          coverArtDate: new Date().toISOString(),
          coverArtLarge: "/images/tracklist-placeholder.png",
          coverArtSmall: "/images/tracklist-placeholder.png",
        });
      }
    } catch (error) {
      console.error("Error fetching cover art:", error);
      res.status(500).json({ message: "Failed to fetch cover art" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
