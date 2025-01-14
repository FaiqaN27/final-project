import express from "express";
import { createReview } from "../controllers/review.controller.js";
import { verifyToken } from "../utils/verify.token.js";

const router = express.Router();

router.post("/:tourId", verifyToken, createReview)
export default router;