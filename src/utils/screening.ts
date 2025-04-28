import Movie from "../db/models/Movie";
import Screening from "../db/models/Screening";

const validateScreening = async (screening: Screening) => {
  const movie = await Movie.findOne({ where: { id: screening.movie_id } });
  const isDateValid =
    screening.start_time > new Date() &&
    screening.start_time < screening.end_time;
  return movie && isDateValid;
};

export { validateScreening };
