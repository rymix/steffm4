// pages/api/categories.js

import { db, initializeDb } from "db";

export default async function handler(_req: any, res: any): Promise<void> {
  await initializeDb();

  const categories = db.data?.categories || [];
  res.status(200).json(categories);
}
