import { createReservation } from "../services/reservationsService";
import { createReservedSeat } from "../services/reservedSeatService";
import { ReservationType } from "../types/reservation";

const checkSeatAvailability = async (seats: string[]) => {};

const getTwentyMinutesBeforeDate = (date: Date) => {
  return new Date(date.getTime() - 20 * 60 * 1000);
};

const addReservedSeats = async (
  reservation_id: string,
  selected_seats: string[]
) => {
  selected_seats.map(async (seat) => {
    await createReservedSeat(reservation_id, seat);
  });
};

const addReservation = async (
  type: ReservationType,
  screening_id: string,
  selected_seats: string[],
  email?: string
) => {
  const reservation = await createReservation(type, screening_id, email);
  await addReservedSeats(reservation.id, selected_seats);
  return reservation;
};

export { getTwentyMinutesBeforeDate, addReservedSeats, addReservation };
