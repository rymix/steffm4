// pages/api/mix.ts
import { db, initializeDb } from "db";
import _ from "lodash";

export default async function handler(req: any, res: any): Promise<void> {
  await initializeDb();

  const { mixcloudKey } = req.query;

  if (mixcloudKey) {
    const mix = db.data?.mixes.find((m) => m.mixcloudKey === mixcloudKey);
    if (mix) {
      const categoryDetail = db.data?.categories.find(
        (c) => c.code.toString() === mix.category.toString(),
      );
      const mixWithCategory = {
        ...mix,
        category: categoryDetail || mix.category,
      };
      res.status(200).json(_.omit(mixWithCategory, "tracks"));
    } else {
      res.status(404).json({ message: "Mix not found" });
    }
  } else {
    res.status(400).json({ message: "Mixcloud key is required" });
  }
}
