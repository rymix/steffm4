// pages/api/tags.js

import { db, initializeDb } from "db";

export default async function handler(_req: any, res: any): Promise<void> {
  await initializeDb();

  const tags = new Set();
  db.data?.mixes.forEach((mix) => {
    mix.tags.forEach((tag) => tags.add(tag));
  });

  res.status(200).json([...tags]);
}
