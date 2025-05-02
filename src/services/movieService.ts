import Movie from "../db/models/Movie";

const createMovieService = async (movieProps: Movie) => {
  const movie = await Movie.create({ title: movieProps.title });
  return movie;
};

const fetchMovies = async () => {
  const movies = await Movie.findAll();
  return movies;
};

const fetchMovie = async (movie_id: string) => {
  const movie = await Movie.findByPk(movie_id);
  return movie;
};

export { createMovieService, fetchMovies, fetchMovie };
