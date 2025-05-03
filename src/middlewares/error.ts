import { Request, Response } from "express";
import { ValidationError } from "sequelize";

const errorHandler = (err: unknown, req: Request, res: Response) => {
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

  console.error(err);
  res.status(500).json({ message: "Internal server error" });
};

export { errorHandler };
