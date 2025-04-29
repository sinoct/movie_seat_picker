import { Request, Response, NextFunction } from "express";
import { createMovieService, fetchMovies } from "../services/movieService";

const createMovie = async (req: Request, res: Response, next: NextFunction) => {
  const movie = await createMovieService(req.body);
  res.status(200).json(movie);
};

const getMovies = async (req: Request, res: Response, next: NextFunction) => {
  const movies = await fetchMovies();
  res.status(200).json(movies);
};

export { createMovie, getMovies };
