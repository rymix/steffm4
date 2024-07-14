import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const users = [
  // Ideally, you should fetch user data from a database
  // password: "$2a$10$lLx1OanUNDEYfrbFMxPafuK3x1c.WOS6ZfGfnNSPZi5jXnT9CaJIK",
  {
    username: "admin",
    password: "$2a$10$dSBpnroDjQmC3ANWolFqC.yb4S.XLimPRiKYnl1hDd55KTqRQFc5O",
  },
];

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  const { username, password } = req.body;

  console.log("u/p", username, password);

  const user = users.find((u) => u.username === username);
  if (user) {
    console.log("Stored hashed password:", user.password);

    const salt = bcrypt.genSaltSync(10);
    const incomingHashedPassword = bcrypt.hashSync(password, salt);
    console.log("Incoming password hashed:", incomingHashedPassword);

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
