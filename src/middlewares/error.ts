import { Request, Response } from "express";

const errorHandler = (req: Request, res: Response) => {
  res.status(404).json({ message: "Invalid route" });
};

export { errorHandler };
