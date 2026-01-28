import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { createTask, completeTask } from "../controllers/task.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.patch("/:id/complete", authMiddleware, completeTask);

export default router;
