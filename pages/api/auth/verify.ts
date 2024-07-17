// pages/api/auth/verify.ts

import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const secret = process.env.JWT_SECRET;

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("token", token);
  console.log("secret", secret);

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
    console.log("verify catch");
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default handler;
