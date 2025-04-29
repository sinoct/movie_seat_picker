import Seat from "../db/models/Seat";

const createSeat = async (
  row_number: number,
  seat_number: number,
  room_id: string
) => {
  const seat = await Seat.create({ row_number, seat_number, room_id });
  return seat;
};

export { createSeat };
