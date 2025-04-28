import { Request, Response, NextFunction } from "express";

const createReserVation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body as ReservationRequest;
};
