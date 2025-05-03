import Seat from "../db/models/Seat";
import { createReservation } from "../services/reservationsService";
import { createReservedSeat } from "../services/reservedSeatService";
import { getSeatAvailability } from "../services/screeningService";
import { getSeatsWithReservation } from "../services/seatService";
import { ReservationType } from "../types/reservation";
import { formatSeatsInRows } from "./seat";

const checkSeatAvailability = async (seats: string[], screening_id: string) => {
  const seatsWithReservation = await getSeatsWithReservation(
    seats,
    screening_id
  );
  const seatsWithAvailability = formatSeatsInRows(seatsWithReservation);
  const filteredSeatAvailability = seatsWithAvailability.filter(
    (row: formattedSeat[]) => {
      return row.length > 0;
    }
  );
  return filteredSeatAvailability;
};

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
  email: string,
  type: ReservationType,
  screening_id: string,
  selected_seats: string[]
) => {
  const reservation = await createReservation(type, screening_id, email);
  await addReservedSeats(reservation.id, selected_seats);
  return reservation;
};

const checkForEmptySingleSeat = async (
  selected_seats: string[],
  screening_id: string
) => {
  const seatAvailability = await getSeatAvailability(screening_id);
  const formattedSeatAvailability = formatSeatsInRows(
    seatAvailability?.room?.seats!
  );
  const affectedRow = formattedSeatAvailability.filter(
    (row: formattedSeat[]) => {
      return row.some((seat) => selected_seats.includes(seat.id));
    }
  )[0];
  let emptySeatsOnLeft = 0;
  let emptySeatsOnRight = 0;
  let before = true;
  let isEmptySingleSeat = false;
  let areSeatsAdjacent = checkIfAdjacentSeats(
    affectedRow.filter((seat: formattedSeat) =>
      selected_seats.includes(seat.id)
    )
  );
  for (let seat of affectedRow) {
    if (!selected_seats.includes(seat.id)) {
      if (before) {
        seat.availability ? emptySeatsOnLeft++ : (emptySeatsOnLeft = 0);
      } else {
        if (seat.availability) {
          emptySeatsOnRight++;
        } else {
          break;
        }
      }
    } else {
      before = false;
    }
  }
  if (emptySeatsOnLeft === 1 || emptySeatsOnRight === 1) {
    isEmptySingleSeat = true;
  }
  return { isEmptySingleSeat, areSeatsAdjacent };
};

const checkIfAdjacentSeats = (seats: formattedSeat[]) => {
  const sortedSeats = seats
    .slice()
    .sort(
      (a: formattedSeat, b: formattedSeat) => a.seat_number - b.seat_number
    );

  return sortedSeats[sortedSeats.length - 1].seat_number -
    sortedSeats[0].seat_number ===
    sortedSeats.length - 1
    ? true
    : false;
};

export {
  getTwentyMinutesBeforeDate,
  addReservedSeats,
  addReservation,
  checkSeatAvailability,
  checkForEmptySingleSeat,
};
