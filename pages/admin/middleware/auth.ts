// pages/admin/middleware/auth.ts

import jwt from "jsonwebtoken";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const authenticateToken =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(403).json({ message: "Token is required" });
    }

    try {
      const user = jwt.verify(token, process.env.JWT_SECRET!);
      (req as any).user = user; // Extend request type
      return handler(req, res);
    } catch {
      return res.status(403).json({ message: "Invalid token" });
    }
  };
