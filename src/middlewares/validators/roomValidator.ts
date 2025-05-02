import { Request, Response, NextFunction } from "express";
const validateRoomCreation = async (
  req: Request<{}, {}, { name: string; rows: number[] }>,
  res: Response,
  next: NextFunction
) => {
  const { name, rows } = req.body;
  if (!name || !rows) {
    res.status(400).json({ message: "Invalid request body" });
    return;
  }
  if (rows.length === 0 || rows.some((row) => row === 0)) {
    res.status(400).json({ message: "Invalid row input" });
    return;
  }
  next();
};

export { validateRoomCreation };
