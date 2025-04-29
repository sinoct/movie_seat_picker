import { Router } from "express";
import { createScreening } from "../controllers/screeningController";

const router = Router();

router.route("/").post(createScreening);

export default router;
