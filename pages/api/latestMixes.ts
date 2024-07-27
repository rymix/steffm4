import { db, initializeDb } from "db";
import type { Mix } from "db/types";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await initializeDb();

  const mixes: Mix[] = db.data?.mixes || [];

  // Convert uploadedDate to a sortable datetime format and sort by uploadedDate in descending order
  const sortedMixes = mixes.sort((a, b) => {
    const dateA = new Date(a.uploadedDate).getTime();
    const dateB = new Date(b.uploadedDate).getTime();
    return dateB - dateA;
  });

  // Get the 5 most recent mixes
  const recentMixes = sortedMixes.slice(0, 5);

  res.status(200).json(recentMixes);
};

export default handler;

