// pages/api/admin/deleteCategory.ts

import { db, initializeDb } from "db";
import type { NextApiRequest, NextApiResponse } from "next";
import { authenticateToken } from "pages/admin/middleware/auth";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (req.method === "POST") {
    await initializeDb();
    const { index } = req.body;

    const categoryIndex = db.data?.categories.findIndex(
      (cat) => cat.index === index,
    );
    if (categoryIndex === -1 || categoryIndex === undefined) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    db.data.categories.splice(categoryIndex, 1);
    await db.write();

    res.status(200).json({ message: "Category deleted successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default authenticateToken(handler);
