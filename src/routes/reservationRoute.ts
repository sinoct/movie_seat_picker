import { Router } from "express";
import { lockSeats, reserveSeats } from "../controllers/reservationController";

const router = Router();

router.route("/lock").post(lockSeats);
router.route("/reserve").post(reserveSeats);

export default router;
