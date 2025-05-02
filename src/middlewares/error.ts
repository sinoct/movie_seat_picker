import { NextFunction, Request, Response } from "express";
import { ValidationError } from "sequelize";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidationError) {
    res.status(400).json({
      message: "Validation error",
      errors: err.errors.map((e) => ({
        field: e.path,
        message: e.message,
      })),
    });
    return;
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    res.status(409).json({
      message: "Unique field already exists",
      errors: err.errors.map((e: any) => ({
        field: e.path,
        message: e.message,
      })),
    });
    return;
  }

  console.error(err); // Log for debugging
  res.status(500).json({ message: "Internal server error" });
};

export { errorHandler };
