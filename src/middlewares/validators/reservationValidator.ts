import { Request, Response, NextFunction } from "express";
import {
  LockRequest,
  ReservationRequest,
  ReservationType,
} from "../../types/reservation";
import { getReservation } from "../../services/reservationsService";
import {
  checkForEmptySingleSeat,
  checkSeatAvailability,
} from "../../utils/reservation";

const validateReservationRequest = async (
  req: Request<{}, {}, ReservationRequest>,
  res: Response,
  next: NextFunction
) => {
  const { email, reservation_id, selected_seats, screening_id } = req.body;

  if (
    !email ||
    !(!reservation_id || (selected_seats?.length === 0 && !screening_id))
  ) {
    res.status(400).json({ message: "Invalid request body" });
    return;
  }

  if (reservation_id) {
    const reservation = await getReservation(reservation_id);
    if (!reservation) {
      res.status(404).json({ message: "Reservation not found" });
      return;
    }
    if (reservation.status === ReservationType.CANCELLED) {
      res.status(400).json({ message: "Reservation was cancelled" });
      return;
    }
    if (
      reservation.email !== email ||
      reservation.status !== ReservationType.LOCKED
    ) {
      res.status(400).json({ message: "Seats already reserved" });
      return;
    }
  }

  if (selected_seats && screening_id) {
    const seatAvailability = await checkSeatAvailability(
      selected_seats,
      screening_id
    );

    if (seatAvailability.length > 1) {
      res.status(400).json({ message: "Seats need to belong in the same row" });
      return;
    }
    const isAnySeatTaken = seatAvailability[0].some(
      (seat) => !seat.availability
    );
    if (isAnySeatTaken) {
      res.status(400).json({ message: "One or more seats taken" });
      return;
    }
    const isEmptySingleSeatLeft = await checkForEmptySingleSeat(
      selected_seats,
      screening_id
    );
    if (isEmptySingleSeatLeft.isEmptySingleSeat) {
      res.status(400).json({ message: "You cannot leave empty single seats" });
      return;
    }
    if (!isEmptySingleSeatLeft.areSeatsAdjacent) {
      res.status(400).json({ message: "Selected seats have to be adjacent" });
      return;
    }
  }
  next();
};

const validateLockRequest = async (
  req: Request<{}, {}, LockRequest>,
  res: Response,
  next: NextFunction
) => {
  const { selected_seats, screening_id } = req.body;
  if (!screening_id || !selected_seats || selected_seats.length === 0) {
    res.status(400).json({ message: "Invalid request body" });
    return;
  }
  const isEmptySingleSeatLeft = await checkForEmptySingleSeat(
    selected_seats,
    screening_id
  );
  if (isEmptySingleSeatLeft.isEmptySingleSeat) {
    res.status(400).json({ message: "You cannot leave empty single seats" });
    return;
  }
  if (!isEmptySingleSeatLeft.areSeatsAdjacent) {
    res.status(400).json({ message: "Selected seats have to be adjacent" });
    return;
  }

  const seatAvailability = await checkSeatAvailability(
    selected_seats,
    screening_id
  );

  if (seatAvailability.length > 1) {
    res.status(400).json({ message: "Seats need to belong in the same row" });
    return;
  }
  const isAnySeatTaken = seatAvailability[0].some((seat) => !seat.availability);
  if (isAnySeatTaken) {
    res.status(400).json({ message: "One or more seats taken" });
    return;
  }

  next();
};

export { validateReservationRequest, validateLockRequest };
