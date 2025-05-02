import { Router } from "express";
import {
  cancelReservation,
  lockSeats,
  reserveSeats,
} from "../controllers/reservationController";
import {
  validateLockRequest,
  validateReservationRequest,
} from "../middlewares/validators/reservationValidator";

const router = Router();

router.route("/lock").post(validateLockRequest, lockSeats);
router.route("/reserve").post(validateReservationRequest, reserveSeats);
router.route("/revoke/:reservation_id").put(cancelReservation);

export default router;
