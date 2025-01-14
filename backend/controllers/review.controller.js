import Tour from "../models/tour.model.js";
import Review from "../models/review.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";

export const createReview = async (req, res) => {
    try {
        const tourId = req.params.tourId;
        const { username, reviewText, rating } = req.body;
        
        // Get userId from the authenticated user (assuming it's in req.user from auth middleware)
        const userId = req.user.id;

        // Validate tourId
        if (!mongoose.Types.ObjectId.isValid(tourId)) {
            return res.status(404).json({ 
                success: false, 
                message: "Invalid Tour ID" 
            });
        }

        // Ensure the tour exists
        const tour = await Tour.findById(tourId);
        if (!tour) {
            return res.status(404).json({ 
                success: false, 
                message: "Tour not found" 
            });
        }

        // Validate user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Validate required fields
        if (!reviewText || !rating) {
            return res.status(400).json({
                success: false,
                message: "Review text and rating are required"
            });
        }

        // Check if rating is valid
        if (rating < 0 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: "Rating must be between 0 and 5"
            });
        }

        // Check if user has already reviewed this tour
        const existingReview = await Review.findOne({ 
            tourId: tourId,
            userId: userId 
        });

        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: "You have already reviewed this tour"
            });
        }

        // Create new review
        const newReview = new Review({
            tourId,
            userId,
            username: user.username, // Use the username from the user document
            reviewText,
            rating
        });

        // Save the review
        const savedReview = await newReview.save();

        // Update tour's reviews array
        await Tour.findByIdAndUpdate(tourId, {
            $push: { reviews: savedReview._id }
        });

        // Calculate new average rating
        const reviews = await Review.find({ tourId: tourId });
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviews.length;

        // Update tour's average rating
        await Tour.findByIdAndUpdate(tourId, {
            averageRating: Math.round(averageRating * 10) / 10
        });

        res.status(200).json({ 
            success: true, 
            message: "Review submitted successfully", 
            data: savedReview 
        });

    } catch (error) {
        console.error("Error in createReview: ", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to submit review", 
            error: error.message 
        });
    }
};