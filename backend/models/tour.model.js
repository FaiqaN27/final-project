import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: false
        },
        country: {
            type: String,
            required: false,
        },
        duration: {
            type: Number,
            required: false,
        },
        description: {
            type: String,
            required: false,
        },
        price: {
            type: Number,
            required: false,
        },
        maxGroupSize: {
            type: Number,
            required: false,
        },
        image: {
            type: String,
            required: false,
        },
        hotelDetails: {
            name: { type: String, required: true },
            location: { type: String, required: true },
        }, reviews: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Review",
            },
        ],
    },
    {
        timestamps: true, // CreatedAt , UpdatedAt
    }
);

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;