// pages/api/auth/login.ts

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const users = [
  {
    username: "admin",
    password: "$2a$10$RITrccyUWAUReGldZslhReTp4SPAoJsgJIjx5EhjaMDc.zFOgQvgC",
  },
];

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (user) {
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (isPasswordCorrect) {
      const secret = process.env.JWT_SECRET!;

      const token = jwt.sign({ username: user.username }, secret, {
        expiresIn: "1h",
      });

      res.status(200).json({ token });
    } else {
      console.log("Invalid credentials");
      res.status(401).json({ message: "Invalid credentials" });
    }
  } else {
    console.log("User not found");
    res.status(401).json({ message: "User not found" });
  }
};

export default handler;
