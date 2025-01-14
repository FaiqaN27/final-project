import mongoose from "mongoose";
import User from "../models/user.model.js";

// Create a new User
export const createUser = async (req, res) => {
  const user = req.body; //user will send this data

  if (!user.name || !user.email || !user.password) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
  const newUser = new User(user);

  try {
    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.log("Error in Create User:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product ID" });
  }

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "User Deleted" });
  } catch (error) {
    console.log("Error in deleting user:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update User
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product ID" });
  }

  try {
    const updateUser = await User.findByIdAndUpdate(id, user, {
      new: true,
    });
    res.status(200).json({ success: true, data: updateUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get Single User
export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json({
      success: true,
      message: "User Found",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log("Error in fetching users:", error.message);
    res.status(404).json({ success: false, message: "Server Error" });
  }
};

// Get User By Count
export const getUsersByCount = async (req, res) => {
  try {
    const userCount = await User.estimatedDocumentCount();
    res
      .status(200)
      .json({ success: true, message: "Successful", data: userCount });
  } catch (error) {
    console.log("Error in fetching users:", error.message);
    res.status(404).json({ success: false, message: "Server Error" });
  }
} 
