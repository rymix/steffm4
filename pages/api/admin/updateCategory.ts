// pages/api/admin/updateCategory.ts

import { db, initializeDb } from "db";
import type { NextApiRequest, NextApiResponse } from "next";
import { authenticateToken } from "pages/admin/middleware/auth";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (req.method === "POST") {
    console.log("Received POST request");
    console.log("Request headers:", req.headers);
    await initializeDb();
    const { index, code, name, shortName, x, y } = req.body;

    const categoryIndex = db.data?.categories.findIndex(
      (cat) => cat.index === index,
    );

    if (categoryIndex !== -1 && categoryIndex !== undefined) {
      // Update existing category
      db.data.categories[categoryIndex] = {
        index,
        code,
        name,
        shortName,
        x,
        y,
      };
    } else {
      // Create new category
      db.data.categories.push({ index, code, name, shortName, x, y });
    }

    await db.write();
    res.status(200).json({ message: "Category updated successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default authenticateToken(handler);
