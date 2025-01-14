import express from "express";
import {
    createTour,
    deleteTour,
    getAllTours,
    getTour,
    getTourByCountry,
    getTourBySearch,
    getTourCount,
    updateTour,
} from "../controllers/tour.controller.js";
import { verifyAdmin } from "../utils/verify.token.js";
import { uploadTourImage } from '../middleware/upload.js';


const router = express.Router();

// Create new tour
router.post("/", uploadTourImage.single('image'), verifyAdmin, createTour);

// Delete tour
router.delete("/delete/:id", verifyAdmin, deleteTour);

// Update tour
// router.put("/:id", verifyAdmin, updateTour);
router.put('/:id', uploadTourImage.single('image'), verifyAdmin, updateTour);

// Get all Tour
router.get("/", getAllTours);

// Get Tour
router.get("/:id", getTour);

// Get Tour By Search
router.get("/search/getTourBySearch", getTourBySearch);
router.get("/search/getTourCount", getTourCount);

// get tour by country
router.get('/country/:country', getTourByCountry);


export default router;