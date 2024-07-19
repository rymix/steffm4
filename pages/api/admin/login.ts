import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import { generateToken } from "utils/jwt";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (req.method === "POST") {
    const { password } = req.body;

    // Fetch user from database (mock example)
    const user = {
      id: 1,
      username: "admin",
      passwordHash:
        "$2a$10$yYbBJinvbyiGUToZkfSmh.ePcVQmmDyowyd.pOxl7xFioIx5zfNcu",
    };

    if (user && bcrypt.compareSync(password, user.passwordHash)) {
      const token = generateToken(
        `{ id: ${user.id}, username: ${user.username} }`,
      );
      return res.status(200).json({ token });
    }

    return res.status(401).json({ message: "Invalid credentials" });
  }

  return res.status(405).json({ message: "Method not allowed" });
};

export default handler;
