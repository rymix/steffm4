import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  res.status(200).json({ message: "Hello, Admin!" });
};

export default handler;
