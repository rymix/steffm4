// pages/api/random-mix.ts
import { db, initializeDb } from "db";

export default async function handler(req: any, res: any): Promise<void> {
  await initializeDb();

  const { category } = req.query;
  const filteredMixes = category
    ? db.data?.mixes.filter((mix) => mix.category === category)
    : db.data?.mixes;

  if (!filteredMixes || filteredMixes.length === 0) {
    res.status(404).json({ message: "No mixes found" });
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredMixes.length);
  const randomMix = filteredMixes[randomIndex];

  res.status(200).json({ mcKey: randomMix.mixcloudKey });
}
