// pages/api/admin/exportMix.ts

import { db, initializeDb } from "db";
import { Mix } from "db/types";
import { promises as fs } from "fs";
import mime from "mime";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

const generateCueContent = (mix: Mix): string => {
  const header = `PERFORMER "Stef.FM"\nTITLE "${mix.name}"\nFILE "${mix.fileName}" MP3\n`;
  const tracks = mix.tracks
    .map((track, index) => {
      const trackNumber = index.toString().padStart(2, "0");
      const indexTime = `${track.startTime.replace(":", ":")}:00`;
      return `TRACK ${trackNumber} AUDIO\nPERFORMER "${track.artistName}"\nTITLE "${track.trackName}"\nINDEX 01 ${indexTime}\n`;
    })
    .join("");
  return header + tracks;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (req.method === "POST") {
    await initializeDb();
    const { mixcloudKey } = req.body;

    const mix = db.data?.mixes.find(
      (localMix) => localMix.mixcloudKey === mixcloudKey,
    );

    if (!mix) {
      res.status(404).json({ message: "Mix not found" });
      return;
    }

    const cueContent = generateCueContent(mix);

    const fileName = `${mixcloudKey}.cue`;
    const filePath = path.join(process.cwd(), "public", fileName);
    await fs.writeFile(filePath, cueContent);

    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
    res.setHeader(
      "Content-Type",
      mime.getType(fileName) || "application/octet-stream",
    );
    res.status(200).send(cueContent);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
