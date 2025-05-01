import ReservedSeat from "../db/models/ReservationSeat";
import Seat from "../db/models/Seat";
import { ReservationType } from "../types/reservation";

const formatSeatsInRows = async (seats: Seat[]) => {
  const rows: formattedSeat[][] = [];

  seats.map((seat) => {
    if (!rows[seat.row_number]) {
      rows[seat.row_number] = [];
    }
    const seatWithStatus: formattedSeat = {
      id: seat.id,
      row_number: seat.row_number,
      seat_number: seat.seat_number,
      availability: checkSeatAvailability(seat),
    };
    rows[seat.row_number].push(seatWithStatus);
  });

  rows.map((seats: formattedSeat[]) => {
    const sortedSeats = seats.sort(
      (a: formattedSeat, b: formattedSeat) => a.seat_number - b.seat_number
    );
    seats = sortedSeats;
  });

  return rows;
};

const checkSeatAvailability = (seat: Seat) => {
  if (!seat.reservedSeat || seat.reservedSeat.length === 0) {
    return true;
  }
  const isReserved = seat.reservedSeat.some(
    (reservedSeat: ReservedSeat) =>
      reservedSeat.reservation &&
      (reservedSeat.reservation.status === ReservationType.LOCKED ||
        reservedSeat.reservation.status === ReservationType.RESERVED)
  );
  return !isReserved;
};

export { formatSeatsInRows };
