import { Router } from "express";
import {
  createScreening,
  fetchAvailableScreenings,
  fetchSeats,
} from "../controllers/screeningController";

const router = Router();

router.route("/").post(createScreening);
router.route("/available/:movie_id").get(fetchAvailableScreenings);
router.route("/seats/:screening_id").get(fetchSeats);

export default router;
