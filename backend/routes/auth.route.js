import express from "express";
import { login, register } from "../controllers/auth.controller.js";

const router = express.Router();

//Registration
router.post("/register", register);

// Login
router.post("/login", login);

export default router;
