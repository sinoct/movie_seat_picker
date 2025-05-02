import { NextFunction, Request, Response } from "express";

const invalidRouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({ message: "Invalid route" });
};

export { invalidRouteHandler };
