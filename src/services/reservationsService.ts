import { Op } from "sequelize";
import Reservation from "../db/models/Reservation";
import { ReservationType } from "../types/reservation";

const createReservation = async (
  type: ReservationType,
  screening_id: string,
  email?: string
) => {
  const reservation = await Reservation.create({
    screening_id,
    status: type,
    email: email,
  });

  return reservation;
};

const updateReservation = async (
  type: ReservationType,
  reservation_id: string,
  email: string
) => {
  const reservation = await Reservation.update(
    { status: type, email },
    { where: { id: reservation_id } }
  );

  return reservation;
};

const lockExpiration = async (expirationDate: Date) => {
  const [expired] = await Reservation.update(
    { status: ReservationType.CANCELLED },
    {
      where: {
        status: ReservationType.LOCKED,
        createdAt: { [Op.lt]: expirationDate },
      },
    }
  );
  console.log(`Cancelled ${expired} number of reservations`);
};

export { createReservation, updateReservation, lockExpiration };
