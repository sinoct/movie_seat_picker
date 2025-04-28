import { Router } from "express";
import { createScreening } from "../../controllers/screenings/screeningController";

const router = Router();

router.route("/").post(createScreening);

export default router;
