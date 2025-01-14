import Contact from "../models/contact.model.js";
import mongoose from "mongoose";

export const contactForm = async (req, res) => {

  const userResponse = req.body;
  if (
    !userResponse.firstName ||
    !userResponse.lastName ||
    !userResponse.email ||
    !userResponse.phone ||
    !userResponse.message
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
  const sendResponse = new Contact(userResponse);
  console.log("Received contact form data:", userResponse);

  try {
    await sendResponse.save();
    res.status(201).json({ success: true, data: sendResponse });
  } catch (error) {
    console.log("Error in Send Response:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

// Fetch all contact form responses
export const getAllContacts = async (req, res) => {
  try {

    const contacts = await Contact.find(); // Retrieve all contacts from the DB
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    console.error("Error in fetching contact forms:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete Contact Query Response
export const deleteContact = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid User ID" });
  }

  try {
    const response = await Contact.findByIdAndDelete(id);
    if (!response) {
      return res.status(404).json({ success: false, message: "Not Found" });
    }
    res.status(200).json({ success: true, message: "Query Delivered" });
  } catch (error) {
    console.log("Error in deleting response:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}




