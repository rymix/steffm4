// pages/api/randomMix/[[...category]].ts

import { db, initializeDb } from "db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  await initializeDb();

  const { category } = req.query;
  const categoryParam = Array.isArray(category) ? category[0] : category;

  const filteredMixes = categoryParam
    ? db.data?.mixes.filter((mix) => mix.category === categoryParam)
    : db.data?.mixes;

  if (!filteredMixes || filteredMixes.length === 0) {
    res.status(404).json({ message: "No mixes found" });
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredMixes.length);
  const randomMix = filteredMixes[randomIndex];

  res.status(200).json({ mcKey: randomMix.mixcloudKey });
}
