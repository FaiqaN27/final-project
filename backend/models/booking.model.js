import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
        },
        userEmail: {
            type: String,
        },
        tourName: {
            type: String,
            required: false,
        },
        fullName: {
            type: String,
            required: true,
        },
        guestSize: {
            type: Number,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        bookAt: {
            type: Date,
            required: true,
        },
        totalPrice: { // New field to store total price
            type: Number,
            required: true,
        },
        status: { // New field for booking status
            type: String,
            enum: ['pending', 'confirmed', 'cancelled'], // Allowed values
            default: 'pending', // Default value
        }
    },
    { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
