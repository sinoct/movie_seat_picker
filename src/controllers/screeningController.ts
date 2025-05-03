import { Request, Response, NextFunction } from "express";
import Screening from "../db/models/Screening";
import { validateScreening } from "../utils/screening";
import {
  getAvailableScreenings,
  getSeatAvailability,
} from "../services/screeningService";
import { formatSeatsInRows } from "../utils/seat";

const createScreening = async (
  req: Request<{}, {}, Screening>,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  const isScreeningValid = validateScreening(body);
  if (!isScreeningValid) {
    res.status(400).json({ message: "Invalid Screening" });
    return;
  }
  const screening = await Screening.create({ ...body });
  res.status(200).json(screening);
};

const fetchAvailableScreenings = async (
  req: Request<{ movie_id: string }>,
  res: Response,
  next: NextFunction
) => {
  const params = req.params;
  const screenings = await getAvailableScreenings(params.movie_id);
  res.status(200).json({ screenings });
};

const fetchSeats = async (
  req: Request<{ screening_id: string }>,
  res: Response,
  next: NextFunction
) => {
  const params = req.params;
  const screening = await getSeatAvailability(params.screening_id);

  const sortedFormattedSeats = formatSeatsInRows(screening?.room?.seats!);

  res.status(200).json({ sortedFormattedSeats });
};

export { createScreening, fetchAvailableScreenings, fetchSeats };
