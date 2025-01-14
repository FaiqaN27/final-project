import express from "express";
import {
  createGalleryImg,
  deleteGalleryImg,
  getAllGallleryImg,
} from "../controllers/gallery.controller.js"
import { verifyAdmin } from "../utils/verify.token.js";
import { uploadGalleryImage } from '../middleware/upload.js'; // Correct import for gallery images


const router = express.Router();

// Create new gallery
router.post("/", uploadGalleryImage.single('image'), verifyAdmin, createGalleryImg);

// Delete gallery
router.delete("/delete/:id", verifyAdmin, deleteGalleryImg);

// Get all gallery
router.get("/", getAllGallleryImg);

export default router;
