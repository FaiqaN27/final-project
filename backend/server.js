import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import tourRoutes from "./routes/tour.route.js";
import userRoutes from "./routes/user.route.js";
import reviewRoutes from "./routes/review.route.js";
import bookingRoutes from "./routes/booking.route.js";
import contactRoutes from "./routes/contact.route.js";
import authRoutes from "./routes/auth.route.js";
import galleryRoutes from "./routes/gallery.route.js";
import { registerAdmin } from "./controllers/admin.controller.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: true,
  credentials: true,
};

app.get("/", (req, res) => {
  res.send("Hi Guys!");
});

// DB Connection
mongoose.set("strictQuery", true);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // process code 1 means exit with failure, 0 means success
  }
};

// Register admin at startup
registerAdmin();

app.use('/uploads', express.static('uploads'));


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/tours", tourRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/review", reviewRoutes);
app.use("/api/v1/booking", bookingRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/v1/gallery", galleryRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on Port ${PORT}`);
});
