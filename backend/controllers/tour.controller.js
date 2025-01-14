import mongoose from "mongoose";
import Tour from "../models/tour.model.js";

// Create a new tour
export const createTour = async (req, res) => {

    // Parse hotelDetails from the request body
    let hotelDetails;
    try {
        hotelDetails = JSON.parse(req.body.hotelDetails);
    } catch (error) {
        return res.status(400).json({ success: false, message: "Invalid hotel details" });
    }

    const { title, country, duration, description, price, maxGroupSize } = req.body;

    // Check if required fields are present
    if (!title || !country || !duration || !description || !price || !maxGroupSize || !hotelDetails.name || !hotelDetails.location) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const imageUrl = req.file ? `/uploads/tour/${req.file.filename}` : null; // Store image path

    if (!imageUrl) {
        return res.status(400).json({ success: false, message: "Image is required" });
    }

    const newTour = new Tour({
        title,
        country,
        duration,
        description,
        price,
        maxGroupSize,
        hotelDetails,
        image: imageUrl, // Store the image URL here
    });

    try {
        await newTour.save();
        res.status(201).json({ success: true, data: newTour });
    } catch (error) {
        console.log("Error in Create Tour:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Delete Tour
export const deleteTour = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
            .status(404)
            .json({ success: false, message: "Invalid Tour ID" });
    }

    try {
        const tour = await Tour.findByIdAndDelete(id);
        if (!tour) {
            return res.status(404).json({ success: false, message: "Tour not found" });
        }
        res.status(200).json({ success: true, message: "Tour Deleted" });
    } catch (error) {
        console.log("Error in deleting tour:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Update Tour
export const updateTour = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Tour ID" });
    }

    try {
        // Extract tour data from request body
        const tourData = req.body;

        // If an image file is provided, update the image field
        if (req.file) {
            tourData.image = `/uploads/tour/${req.file.filename}`; // Assuming multer stores images in this path
        }

        // Find and update the tour by its ID
        const updatedTour = await Tour.findByIdAndUpdate(id, tourData, { new: true });

        if (!updatedTour) {
            return res.status(404).json({ success: false, message: "Tour not found" });
        }

        res.status(200).json({ success: true, data: updatedTour });
    } catch (error) {
        console.error("Error updating the tour:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


// Get Single Tour
export const getTour = async (req, res) => {
    const { id } = req.params;
    try {
        const tour = await Tour.findById(id).populate("reviews");
        res.status(200).json({
            success: true,
            message: "Tour Found",
            data: tour,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Get All Tours
export const getAllTours = async (req, res) => {
    try {
        // Check if 'page' is provided in the query parameters
        const page = req.query.page ? parseInt(req.query.page) : null;

        let tours;
        let totalTours;

        if (page !== null) {
            // Apply pagination logic only when 'page' is provided
            tours = await Tour.find({})
                .populate("reviews")
                .skip(page * 8)
                .limit(8);

            totalTours = await Tour.countDocuments();  // Total count for frontend pagination

        } else {
            // Return all tours if no 'page' parameter is provided
            tours = await Tour.find({})
                .populate("reviews");

            totalTours = tours.length;  // Set totalTours to the full list length
        }

        res.status(200).json({
            success: true,
            count: tours.length,
            data: tours,
            totalTours
        });
    } catch (error) {
        console.log("Error in fetching tours:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


// Get Tour By Search
export const getTourBySearch = async (req, res) => {
    const country = new RegExp(req.query.country, "i"); // Case insensitive search for country
    const maxGroupSize = parseInt(req.query.maxGroupSize);
    const minPrice = parseInt(req.query.minPrice); // User-specified minimum price
    const maxPrice = parseInt(req.query.maxPrice); // User-specified maximum price

    try {
        // gte means greater than or equal, lte means less than or equal
        const tours = await Tour.find({
            country,
            maxGroupSize: { $gte: maxGroupSize },
            price: { $gte: minPrice, $lte: maxPrice } // Price range condition
        }).populate("reviews");

        res.status(200).json({ success: true, message: "Successful", data: tours });
    } catch (error) {
        res.status(404).json({ success: false, message: "Server Error" });
    }
};


// // Get Tour Count
export const getTourCount = async (req, res) => {
    try {
        const tourCount = await Tour.countDocuments();
        res
            .status(200)
            .json({ success: true, message: "Successful", data: tourCount });
    } catch (error) {
        console.log("Error in fetching tours:", error.message);
        res.status(404).json({ success: false, message: "Server Error" });
    }
};

// Fetch tours based on country (destination)
export const getTourByCountry = async (req, res) => {
    try {
        const country = req.params.country;
        const tours = await Tour.find({ country: country });
        res.status(200).json(tours);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tours', error });
    }
};
