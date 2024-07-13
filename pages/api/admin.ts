import { NextApiRequest, NextApiResponse } from "next";
import { authenticateToken } from "pages/admin/middleware/auth";

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  res.status(200).json({ message: "Hello, Admin!" });
};

export default authenticateToken(handler);
