import { Request, Response, NextFunction } from "express";
import {
  revokeReservation,
  updateReservation,
} from "../services/reservationsService";
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
  const { email, screening_id, selected_seats } = req.body;
  const reservation = await addReservation(
    email,
    ReservationType.LOCKED,
    screening_id,
    selected_seats
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
      body.email,
      ReservationType.RESERVED,
      body.screening_id,
      body.selected_seats
    );

    res.status(200).json({ message: "Reservation Reserved", reservation });
  }
};

const cancelReservation = async (
  req: Request<{ reservation_id: string }>,
  res: Response,
  next: NextFunction
) => {
  const params = req.params;
  const reservation = await revokeReservation(params.reservation_id);
  res.status(200).json({ reservation });
};

export { lockSeats, reserveSeats, cancelReservation };
