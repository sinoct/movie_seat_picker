import { Request, Response } from "express";
import User from "../db/models/User";

const createUser = async (req: Request, res: Response) => {
  const apiKey = crypto.randomUUID();
  const user = (await User.create({ ...req.body, apiKey })) || null;
  if (user) {
    res.status(200).json({ message: "User Created" });
  } else {
    res.status(400).json({ message: "User Error" });
  }
};

export { createUser };
