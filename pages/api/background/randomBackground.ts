// pages/api/randomBackground.ts

import { db, initializeDb } from "db";
import type { BackgroundExtended } from "db/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { getBackgroundCategoryObject } from "utils/functions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  await initializeDb();

  // Fetch all backgrounds and categories from the database
  let backgrounds = db.data?.backgrounds || [];
  const backgroundCategories = db.data?.backgroundCategories || [];

  if (backgrounds.length === 0) {
    return res.status(404).json({ error: "No backgrounds found" });
  }

  // Map the backgrounds to include category object
  const extendedBackgrounds: BackgroundExtended[] = backgrounds.map(
    (background) => {
      const backgroundCategoryObject = getBackgroundCategoryObject(
        background.backgroundCategory,
        backgroundCategories,
      );
      if (backgroundCategoryObject) {
        return {
          ...background,
          backgroundCategoryObject,
        };
      }
      return background as BackgroundExtended;
    },
  );

  // Pick a random background
  const randomIndex = Math.floor(Math.random() * extendedBackgrounds.length);
  const randomBackground = extendedBackgrounds[randomIndex];

  res.status(200).json(randomBackground);
}

