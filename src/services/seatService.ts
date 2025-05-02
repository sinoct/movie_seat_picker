import { Op } from "sequelize";
import Seat from "../db/models/Seat";
import ReservedSeat from "../db/models/ReservationSeat";
import Reservation from "../db/models/Reservation";

const createSeat = async (
  row_number: number,
  seat_number: number,
  room_id: string
) => {
  const seat = await Seat.create({ row_number, seat_number, room_id });
  return seat;
};

const getSeatsWithReservation = async (
  seat_ids: string[],
  screening_id: string
) => {
  const seats = await Seat.findAll({
    where: { id: { [Op.in]: seat_ids } },
    include: [
      {
        model: ReservedSeat,
        include: [
          { model: Reservation, where: { screening_id }, required: false },
        ],
        required: false,
      },
    ],
  });

  return seats;
};

export { createSeat, getSeatsWithReservation };
