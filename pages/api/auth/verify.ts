import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const secret = process.env.JWT_SECRET;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): void {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  try {
    if (secret) {
      jwt.verify(token, secret);

      return res.status(200).json({ message: "Token is valid" });
    }

    throw new Error("JWT secret is not defined");
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
