import { Request, Response, NextFunction } from "express";
import {
  createReservation,
  updateReservation,
} from "../services/reservationsService";
import { createReservedSeat } from "../services/reservedSeatService";
import { ReservationRequest, ReservationType } from "../types/reservation";

const addReservation = async (
  req: Request<{}, {}, ReservationRequest>,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  let responseText = "Reservation Added";
  if (body.type === ReservationType.LOCKED) {
    const reservation = await createReservation(
      body.type,
      body.screening_id,
      body.email
    );

    body.selected_seats.map(async (seat) => {
      await createReservedSeat(reservation.id, seat);
    });
  } else {
    const reservation = await updateReservation(
      body.type,
      body.reservation_id!,
      body.email
    );
    responseText = "fasz";
  }

  res.status(200).json({ message: responseText });
};

export { addReservation };
