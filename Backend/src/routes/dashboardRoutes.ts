import express from "express";

import authMiddleware from "../middleware/authMiddleware";

import { getDashboardStats } from "../controllers/dashboardController";

const router = express.Router();

router.use(authMiddleware);

router.get("/stats", getDashboardStats);

export default router;