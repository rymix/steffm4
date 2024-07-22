import { db, initializeDb } from "db";
import type { Background } from "db/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  await initializeDb();

  const { backgroundCategory, name, tileType } = req.query;

  let filteredBackgrounds: Background[] = db.data?.backgrounds || [];

  if (typeof backgroundCategory === "string") {
    filteredBackgrounds = filteredBackgrounds.filter(
      (background) => background.backgroundCategory === backgroundCategory,
    );
  }

  if (typeof name === "string") {
    filteredBackgrounds = filteredBackgrounds.filter((background) =>
      background.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  if (typeof tileType === "string") {
    filteredBackgrounds = filteredBackgrounds.filter(
      (background) =>
        background.tileType &&
        background.tileType.toLowerCase().includes(tileType.toLowerCase()),
    );
  }

  filteredBackgrounds = filteredBackgrounds.sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  res.status(200).json(filteredBackgrounds);
}
