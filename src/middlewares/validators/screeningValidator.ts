import { Request, Response, NextFunction } from "express";
import { fetchMovie } from "../../services/movieService";
import { fetchRoom } from "../../services/roomServicce";
import { getScreening } from "../../services/screeningService";

const validateScreeningcreation = async (
  req: Request<
    {},
    {},
    { movie_id: string; room_id: string; start_time: string; end_time: string }
  >,
  res: Response,
  next: NextFunction
) => {
  const { movie_id, room_id, start_time, end_time } = req.body;
  if (!movie_id || !room_id || !start_time || !end_time) {
    res.status(400).json({ message: "Invalid request body" });
  }
  const movie = await fetchMovie(movie_id);
  if (!movie) {
    res.status(400).json({ message: "Movie not found" });
  }
  const room = await fetchRoom(room_id);
  if (!room) {
    res.status(400).json({ message: "Room not found" });
  }
  if (new Date(start_time).getTime() < new Date().getTime()) {
    res
      .status(400)
      .json({ message: "Screening has to start in a future date" });
  }
  if (new Date(start_time).getTime() > new Date(end_time).getTime()) {
    res.status(400).json({ message: "Screening has to start before the time" });
  }

  next();
};

const validateFetchScreenings = async (
  req: Request<{ movie_id: string }>,
  res: Response,
  next: NextFunction
) => {
  const { movie_id } = req.params;
  const movie = await fetchMovie(movie_id);
  if (!movie) {
    res.status(404).json({ message: "Movie not found" });
  }
  next();
};

const validatefetchSeats = async (
  req: Request<{ screening_id: string }>,
  res: Response,
  next: NextFunction
) => {
  const { screening_id } = req.params;
  if (!screening_id) {
    res.status(404).json({ message: "Screening Id is required" });
  }
  const screening = await getScreening(screening_id);
  if (!screening) {
    res.status(404).json({ message: "Screening not found" });
  }
  next();
};

export {
  validateScreeningcreation,
  validateFetchScreenings,
  validatefetchSeats,
};
