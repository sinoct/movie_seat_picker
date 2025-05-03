import { Request, Response } from "express";

const invalidRouteHandler = (req: Request, res: Response) => {
  res.status(404).json({ message: "Invalid route" });
};

export { invalidRouteHandler };
