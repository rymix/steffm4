import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "your-secret-key";

interface TokenPayload {
  id: number;
  username: string;
}

export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, secretKey) as TokenPayload;
  } catch {
    return null;
  }
};
