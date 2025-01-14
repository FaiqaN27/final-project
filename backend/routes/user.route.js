import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
  getUsersByCount,
} from "../controllers/user.controller.js";
import { verifyAdmin, verifyUser } from "../utils/verify.token.js";

const router = express.Router();

// Delete user
router.delete("/:id", verifyAdmin, deleteUser);

// Update user
router.put("/:id", verifyUser, updateUser);

// Get all User
router.get("/", verifyAdmin, getAllUsers);

// Get User
router.get("/:id", verifyUser, getUser);

// Get User Count
router.get("/count", verifyAdmin, getUsersByCount);

export default router;
