import { Op } from "sequelize";
import Screening from "../db/models/Screening";
import Room from "../db/models/Room";
import Seat from "../db/models/Seat";
import ReservedSeat from "../db/models/ReservationSeat";
import Reservation from "../db/models/Reservation";

const getAvailableScreenings = async (movie_id: string) => {
  const currentDate = new Date();
  const screenings = await Screening.findAll({
    where: { movie_id, start_time: { [Op.gt]: currentDate } },
    include: [{ model: Room }],
    order: [["start_time", "ASC"]],
  });
  return screenings;
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

const getScreening = async (screening_id: string) => {
  const screening = await Screening.findByPk(screening_id);
  return screening;
};

const fetchScreeningsForTimeRange = async (
  startTime: string,
  endTime: string,
  roomId: string
) => {
  const screenings = await Screening.findAll({
    where: {
      room_id: roomId,
      [Op.or]: [
        {
          start_time: {
            [Op.between]: [startTime, endTime],
          },
        },
        {
          end_time: {
            [Op.between]: [startTime, endTime],
          },
        },
      ],
    },
  });
  return screenings;
};

export {
  getAvailableScreenings,
  getSeatAvailability,
  getScreening,
  fetchScreeningsForTimeRange,
};
