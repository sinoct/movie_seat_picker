import { Router } from "express";
import { createRoom } from "../../controllers/rooms/roomController";

const router = Router();

router.route("/").post(createRoom);

export default router;
