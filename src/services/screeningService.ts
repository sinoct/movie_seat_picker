import { Op } from "sequelize";
import Screening from "../db/models/Screening";
import Room from "../db/models/Room";
import Seat from "../db/models/Seat";
import ReservedSeat from "../db/models/ReservationSeat";
import Reservation from "../db/models/Reservation";

const getAvailableScreenings = async (movie_id: string) => {
  const currentDate = new Date();
  const screeenings = await Screening.findAll({
    where: { start_time: { [Op.gt]: currentDate } },
  });
  return screeenings;
};

const getSeatAvailability = async (screening_id: string) => {
  const screening = await Screening.findByPk(screening_id, {
    include: [
      {
        model: Room,
        include: [
          {
            model: Seat,
            include: [
              {
                model: ReservedSeat,
                include: [
                  {
                    model: Reservation,
                    where: { screening_id },
                    required: false,
                  },
                ],
                required: false,
              },
            ],
          },
        ],
      },
    ],
  });

  return screening;
};

export { getAvailableScreenings, getSeatAvailability };
