import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const users = [
  {
    username: "admin",
    password: "$2a$10$dSBpnroDjQmC3ANWolFqC.yb4S.XLimPRiKYnl1hDd55KTqRQFc5O",
  },
];

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" },
      );
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } else {
    res.status(401).json({ message: "User not found" });
  }
};

export default handler;