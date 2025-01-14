import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory in ES module environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure storage for tour images
const tourStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/tour'));  // Store in 'uploads/tour'
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));  // Filename = timestamp + file extension
  },
});

// Configure storage for gallery images
const galleryStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/gallery'));  // Store in 'uploads/gallery'
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));  // Filename = timestamp + file extension
  },
});

// Create middleware for tour image uploads
export const uploadTourImage = multer({ storage: tourStorage });

// Create middleware for gallery image uploads
export const uploadGalleryImage = multer({ storage: galleryStorage });
