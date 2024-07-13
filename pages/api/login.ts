import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const users = [
  // Ideally, you should fetch user data from a database
  {
    username: "admin",
    password: "$2a$10$lLx1OanUNDEYfrbFMxPafuK3x1c.WOS6ZfGfnNSPZi5jXnT9CaJIK",
  },
];

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" },
    );
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

export default handler;
