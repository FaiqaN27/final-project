import Gallery from "../models/gallery.model.js";
import mongoose from "mongoose";

//createGallery
export const createGalleryImg = async (req, res) => {

  // Check if an image file is uploaded
  const imageUrl = req.file ? `/uploads/gallery/${req.file.filename}` : null;

  if (!imageUrl) {
    return res.status(400).json({ success: false, message: "Image is required" });
  }

  const newGallery = new Gallery({
    image: imageUrl
  });

  try {
    await newGallery.save();
    res.status(201).json({ success: true, data: newGallery });
  } catch (error) {
    console.log("Error in Create Tour:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }

}

// DeleteGallery
export const deleteGalleryImg = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid  ID" });
  }

  try {
    const gallery = await Gallery.findByIdAndDelete(id);
    if (!gallery) {
      return res.status(404).json({ success: false, message: "Gallery Img not found" });
    }
    res.status(200).json({ success: true, message: "Gallery Img Deleted" });
  } catch (error) {
    console.log("Error in deleting gallery img:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }

}

// Get All Tours
export const getAllGallleryImg = async (req, res) => {


  try {
    const gallery = await Gallery.find({})

    res.status(200).json({ success: true, data: gallery });
  } catch (error) {
    console.log("Error in fetching gallery img:", error.message);
    res.status(404).json({ success: false, message: "Server Error" });
  }
};