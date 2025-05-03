import { Request, Response } from "express";
import {
  createMovieService,
  fetchMovie,
  fetchMovies,
} from "../services/movieService";

const createMovie = async (req: Request, res: Response) => {
  const movie = await createMovieService(req.body);
  res.status(200).json(movie);
};

const getMovies = async (req: Request, res: Response) => {
  const movies = await fetchMovies();
  res.status(200).json(movies);
};

const getMovie = async (req: Request, res: Response) => {
  const params = req.params;
  const movies = await fetchMovie(params.movie_id);
  res.status(200).json(movies);
};

export { createMovie, getMovies, getMovie };
