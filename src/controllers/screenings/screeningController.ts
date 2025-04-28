import { Request, Response, NextFunction } from "express";
import Screening from "../../db/models/Screening";
import { validateScreening } from "../../utils/screening";

const createScreening = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body as Screening;
  const isScreeningValid = validateScreening(body);
  if (!isScreeningValid) {
    res.status(400).json({ message: "Invalid Screening" });
    return;
  }
  const screening = await Screening.create(req.body);
  res.status(200).json(screening);
};

export { createScreening };
