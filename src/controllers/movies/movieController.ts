import { Request, Response, NextFunction } from "express";
import Movie from "../../db/models/Movie";

const createMovie = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  const movie = await Movie.create(req.body);
  res.status(200).json(movie);
};

const getMovies = async (req: Request, res: Response, next: NextFunction) => {
  const movies = await Movie.findAll();
  res.status(200).json(movies);
};

export { createMovie, getMovies };
