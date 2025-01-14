// import jwt from 'jsonwebtoken';
// import User from '../models/user.model.js';

// export const protect = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//     token = req.headers.authorization.split(" ")[1];
//   }

//   if (!token) {
//     console.log("No token found"); // Log for debugging
//     return res.status(401).json({ message: "Not authorized, no token" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select("-password"); // Exclude password from user object
//     next();
//   } catch (error) {
//     console.log("Token verification failed:", error.message); // Log the error
//     res.status(401).json({ message: "Not authorized, token failed" });
//   }
// };

// // Middleware to check if user is admin
// export const admin = (req, res, next) => {
//   if (req.user && req.user.role === 'admin') {
//     next();
//   } else {
//     res.status(403).json({ message: "Not authorized as an admin" });
//   }
// };

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Middleware to authenticates users
export const protect = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authorization token is required." });
  }
  console.log(token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password"); // Exclude password from user object
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

// Middleware to check if the user is an admin
export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Not authorized as an admin" });
  }
};
