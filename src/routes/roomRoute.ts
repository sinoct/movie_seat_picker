import { Router } from "express";
import { addRoom } from "../controllers/roomController";
import { validateRoomCreation } from "../middlewares/validators/roomValidator";

const router = Router();

router.route("/").post(validateRoomCreation, addRoom);

export default router;
