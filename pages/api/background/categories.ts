import { db, initializeDb } from "db";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  _req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  await initializeDb();

  const backgroundCategories = db.data?.backgroundCategories || [];
  res.status(200).json(backgroundCategories);
};

export default handler;
