import { Router } from "express";
import {
  createMovie,
  getMovies,
} from "../../controllers/movies/movieController";

const router = Router();

router.route("/").get(getMovies);
router.route("/").post(createMovie);

export default router;
