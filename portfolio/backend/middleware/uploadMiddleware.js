import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolio_works", // Folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

export default multer({ storage });