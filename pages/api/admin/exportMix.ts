/* eslint-disable prefer-destructuring */
// pages/api/admin/exportMix.ts

import { db, initializeDb } from "db";
import { Mix } from "db/types";
import { promises as fs } from "fs";
import mime from "mime";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

const formatTime = (startTime: string): string => {
  const parts = startTime.split(":").map(Number);

  let totalMinutes = 0;
  let seconds = 0;

  if (parts.length === 2) {
    // Format mm:ss
    totalMinutes = parts[0];
    seconds = parts[1];
  } else if (parts.length === 3) {
    // Format h:mm:ss
    totalMinutes = parts[0] * 60 + parts[1];
    seconds = parts[2];
  } else {
    throw new Error("Invalid time format");
  }

  const formattedMinutes =
    totalMinutes < 100
      ? totalMinutes.toString().padStart(2, "0")
      : totalMinutes.toString();
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}:00`;
};

const generateCueContent = (mix: Mix): string => {
  const header = `PERFORMER "Stef.FM"\nTITLE "${mix.name}"\nFILE "${mix.fileName}" MP3\n`;

  const tracks = mix.tracks
    .map((track, index) => {
      const trackNumber = (index + 1).toString().padStart(2, "0");
      const indexTime = formatTime(track.startTime);
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
