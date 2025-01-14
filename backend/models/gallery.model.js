import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },

  },
  {
    timestamps: true, // CreatedAt , UpdatedAt
  }
);

const Gallery = mongoose.model("Gallery", gallerySchema);

export default Gallery;