import bcrypt from "bcryptjs";
import { generateToken } from "utils/jwt";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { username, password } = req.body;

    // Fetch user from database (mock example)
    const user = {
      id: 1,
      username: "admin",
      passwordHash: bcrypt.hashSync("password", 10),
    };

    if (user && bcrypt.compareSync(password, user.passwordHash)) {
      const token = generateToken({ id: user.id, username: user.username });
      return res.status(200).json({ token });
    }

    return res.status(401).json({ message: "Invalid credentials" });
  }

  return res.status(405).json({ message: "Method not allowed" });
};

export default handler;
