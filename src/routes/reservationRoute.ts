import { Router } from "express";
import { addReservation } from "../controllers/reservationController";

const router = Router();

router.route("/").post(addReservation);

export default router;
