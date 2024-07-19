import { verifyToken } from "utils/jwt";

export const authenticate = (handler: (req: any, res: any) => Promise<any>) => {
  return async (req: any, res: any) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = decoded; // Attach user info to request
    return handler(req, res);
  };
};
