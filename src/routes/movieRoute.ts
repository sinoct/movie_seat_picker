import { Router } from "express";
import {
  createMovie,
  getMovie,
  getMovies,
} from "../controllers/movieController";

const router = Router();

router.route("/").get(getMovies);
router.route("/").post(createMovie);

export default router;
