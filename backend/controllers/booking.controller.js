import Booking from "../models/booking.model.js"

export const createBooking = async (req, res) => {
    const { totalPrice, userId, userEmail, tourName, fullName, guestSize, phone, bookAt } = req.body;

    const newBooking = new Booking({
        userId,
        userEmail,
        tourName,
        fullName,
        guestSize,
        phone,
        bookAt,
        totalPrice,
        status: 'pending' // Set initial status to pending
    });

    try {
        const savedBooking = await newBooking.save();
        res.status(201).json({ success: true, message: "Thank You for booking! your tour is in pending state", data: savedBooking });
    } catch (error) {
        console.error("Error creating booking:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


// Get All bookings for a specific user
// export const getBooking = async (req, res) => {
//     const userid = req.body.userid

//     try {
//         const bookings = await Booking.find({ userid: userid }).populate("tourId");

//         if (!bookings || bookings.length === 0) {
//             return res.status(404).json({ success: false, message: "No bookings found for this user" });
//         }

//         res.status(200).json({ success: true, data: bookings });
//     } catch (error) {
//         console.error("Error fetching bookings:", error.message);
//         res.status(500).json({ success: false, message: "Server error" });
//     }
// };

// Get all booking
export const getAllBooking = async (req, res) => {
    try {
        const books = await Booking.find()
        res.status(200).json({ success: true, message: "Successful", data: books })
    } catch (error) {
        console.error("Error fetching all bookings:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
