import { Request, Response, NextFunction } from "express";
import User from "../db/models/User";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    res.status(401).json({ message: "You need to be logged in" });
  }

  const user = await User.findOne({ where: { apiKey } });

  if (!user) {
    res.status(401).json({ message: "No user found" });
  }
  req.user = user;
  next();
};
