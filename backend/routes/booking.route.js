import express from "express";
import { verifyAdmin, verifyToken } from "../utils/verify.token.js";
import { createBooking, getAllBooking } from "../controllers/booking.controller.js";

const router = express.Router();

// Example for a route setup
router.post('/', verifyToken, createBooking);
router.get('/', verifyAdmin, getAllBooking);

export default router;