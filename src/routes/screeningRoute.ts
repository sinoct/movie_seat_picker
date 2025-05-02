import { Router } from "express";
import {
  createScreening,
  fetchAvailableScreenings,
  fetchSeats,
} from "../controllers/screeningController";
import {
  validateFetchScreenings,
  validatefetchSeats,
  validateScreeningcreation,
} from "../middlewares/validators/screeningValidator";

const router = Router();

router.route("/").post(validateScreeningcreation, createScreening);
router
  .route("/available/:movie_id")
  .get(validateFetchScreenings, fetchAvailableScreenings);
router.route("/seats/:screening_id").get(validatefetchSeats, fetchSeats);

export default router;
