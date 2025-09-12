import { Router } from "express";
import { getMe, updateMe, updateProfilePicture } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import multer from "multer";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() }); // store file in memory for Cloudinary

// All routes require authentication
router.use(authMiddleware);

// Get logged-in user profile
router.get("/me", getMe);

// Update user info (username, bio, website)
router.put("/me", updateMe);

// Update profile picture
router.put(
  "/me/profile-picture",
  upload.single("profile_picture"), // expects field named 'profile_picture'
  updateProfilePicture
);

export default router;