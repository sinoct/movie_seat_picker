import { Request, Response, NextFunction } from "express";
import { updateReservation } from "../services/reservationsService";
import {
  LockRequest,
  ReservationType,
  ReservationRequest,
} from "../types/reservation";
import { addReservation } from "../utils/reservation";

const lockSeats = async (
  req: Request<{}, {}, LockRequest>,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  const reservation = await addReservation(
    ReservationType.LOCKED,
    body.screening_id,
    body.selected_seats
  );

  res.status(200).json({ message: "Reservation Locked", reservation });
};

const reserveSeats = async (
  req: Request<{}, {}, ReservationRequest>,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  if (body.reservation_id) {
    const reservation = await updateReservation(
      ReservationType.RESERVED,
      body.reservation_id,
      body.email
    );
    res.status(200).json({ message: "Reservation Reserved", reservation });
    return;
  }
  if (body.screening_id && body.selected_seats) {
    const reservation = await addReservation(
      ReservationType.RESERVED,
      body.screening_id,
      body.selected_seats,
      body.email
    );
    res.status(200).json({ message: "Reservation Reserved", reservation });
  }
};

export { lockSeats, reserveSeats };
