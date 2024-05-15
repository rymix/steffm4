// pages/api/tags.js

import { db, initializeDb } from "db";

export default async function handler(_req: any, res: any): Promise<void> {
  await initializeDb();

  const tags = new Set();
  db.data?.mixes.forEach((mix) => {
    mix.tags.forEach((tag) => tags.add(tag));
  });

  const sortedTags = [...tags].sort((a, b) => a.localeCompare(b));

  res.status(200).json(sortedTags);
}
