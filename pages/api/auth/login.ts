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
  console.log("Received request to login");
  console.log("Request body:", req.body);

  const { username, password } = req.body;
  console.log("Username:", username);
  console.log("Password:", password);

  const user = users.find((u) => u.username === username);
  if (user) {
    console.log("User found:", user);
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    console.log("Is password correct:", isPasswordCorrect);

    if (isPasswordCorrect) {
      const secret = process.env.JWT_SECRET!;
      console.log("JWT Secret:", secret);

      const token = jwt.sign({ username: user.username }, secret, {
        expiresIn: "1h",
      });
      console.log("Generated JWT token:", token);

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
