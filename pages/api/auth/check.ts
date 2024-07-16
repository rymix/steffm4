// pages/api/auth/check.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { authenticateToken } from "pages/admin/middleware/auth";

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  console.log("Request headers in /api/auth/check:", req.headers);
  res.status(200).json({ message: "Authenticated" });
};

export default authenticateToken(handler);
