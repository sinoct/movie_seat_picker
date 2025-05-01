import ReservedSeat from "../db/models/ReservationSeat";

const createReservedSeat = async (reservation_id: string, seat_id: string) => {
  const reservedSeat = await ReservedSeat.create({ reservation_id, seat_id });

  return reservedSeat;
};

export { createReservedSeat };
