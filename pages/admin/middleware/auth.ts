// pages/admin/middleware/auth.ts

import jwt from "jsonwebtoken";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const authenticateToken =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      console.log("No token found in request headers.");
      return res.status(403).json({ message: "Token is required" });
    }

    try {
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET environment variable is not defined");
      }

      console.log("Verifying token:", token);
      const user = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Token verified, user:", user);

      (req as any).user = user; // Extend request type
      return handler(req, res);
    } catch (error) {
      console.error("Error verifying token:", error);
      return res.status(403).json({ message: "Invalid token" });
    }
  };

export default authenticateToken;
