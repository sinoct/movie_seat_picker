import { Router } from "express";
import { createUser } from "../../controllers/users/userController";

const router = Router();

router.route("/").post(createUser);

export default router;
