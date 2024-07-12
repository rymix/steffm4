import { db, initializeDb } from "db";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (req.method === "POST") {
    await initializeDb();
    const { index, code, name, shortName, x, y } = req.body;

    const categoryIndex = db.data?.categories.findIndex(
      (cat) => cat.index === index,
    );
    if (categoryIndex === -1 || categoryIndex === undefined) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    db.data.categories[categoryIndex] = { index, code, name, shortName, x, y };
    await db.write();

    res.status(200).json({ message: "Category updated successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
