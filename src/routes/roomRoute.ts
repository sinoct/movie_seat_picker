import { Router } from "express";
import { addRoom } from "../controllers/roomController";

const router = Router();

router.route("/").post(addRoom);

export default router;
