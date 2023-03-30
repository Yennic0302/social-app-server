import { Router } from "express";
import { getUserProfile } from "../controllers/profileUserController.js";

const router = Router();

router.get("/user-profile/:userId/:id", getUserProfile);

export default router;
