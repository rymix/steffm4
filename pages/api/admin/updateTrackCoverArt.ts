// pages/api/admin/updateTrackCoverArt.ts

import axios from "axios";
import { db, initializeDb } from "db";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

const saveImageLocally = async (
  url: string,
  artistName: string,
  trackName: string,
  size: string,
): Promise<string> => {
  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "arraybuffer",
      headers: {
        "User-Agent": "DiscogsClient/1.0",
      },
    });
    const buffer = Buffer.from(response.data, "binary");

    const fileName = `${artistName}-${trackName}-${size}.jpg`
      .replaceAll(/[^\da-z]/gi, "_")
      .toLowerCase();
    const filePath = path.join(process.cwd(), "public", "trackart", fileName);

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, buffer);

    return `/trackart/${fileName}`;
  } catch (error) {
    console.error(`Error saving image locally: ${error}`);
    return size === "large"
      ? "/images/tracklist-placeholder.png"
      : "/images/tracklist-placeholder.png";
  }
};

const updateIndividualMixFile = async (
  mixcloudKey: string,
  sectionNumber: number,
  coverArt: any,
): Promise<void> => {
  const mixFilePath = path.join(
    process.cwd(),
    "db/mixes",
    `${mixcloudKey}.json`,
  );

  if (fs.existsSync(mixFilePath)) {
    const mixData = JSON.parse(fs.readFileSync(mixFilePath, "utf8"));

    const trackIndex = mixData.tracks.findIndex(
      (track: any) => track.sectionNumber === sectionNumber,
    );

    if (trackIndex >= 0) {
      mixData.tracks[trackIndex] = {
        ...mixData.tracks[trackIndex],
        ...coverArt,
      };

      fs.writeFileSync(mixFilePath, JSON.stringify(mixData, null, 2));
    } else {
      console.warn(`Track not found in mix file: ${mixcloudKey}`);
    }
  } else {
    console.warn(`Mix file not found for key: ${mixcloudKey}`);
  }
};

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
      if (response.data.results && response.data.results.length > 0) {
        const coverArtDate = new Date().toISOString();
        const coverArtLarge = response.data.results[0].cover_image;
        const coverArtSmall = response.data.results[0].thumb;

        const localCoverArtLarge = await saveImageLocally(
          coverArtLarge,
          artistName,
          trackName,
          "large",
        );
        const localCoverArtSmall = await saveImageLocally(
          coverArtSmall,
          artistName,
          trackName,
          "small",
        );

        coverArt = {
          coverArtDate,
          coverArtLarge,
          coverArtSmall,
          localCoverArtLarge,
          localCoverArtSmall,
        };
      } else {
        coverArt = {
          coverArtDate: new Date().toISOString(),
          coverArtLarge: "/images/tracklist-placeholder.png",
          coverArtSmall: "/images/tracklist-placeholder.png",
          localCoverArtLarge: "/images/tracklist-placeholder.png",
          localCoverArtSmall: "/images/tracklist-placeholder.png",
        };
      }

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

        // Update individual mix file
        await updateIndividualMixFile(mixcloudKey, sectionNumber, coverArt);

        res.status(200).json(coverArt);
      } else {
        res.status(404).json({ message: "Track not found" });
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
