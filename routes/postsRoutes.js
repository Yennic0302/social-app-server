import { Router } from "express";
import { createPost } from "../controllers/postController.js";

const router = Router();

router.post("/create-post", createPost);

export default router;
