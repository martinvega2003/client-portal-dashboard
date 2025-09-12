import { Request, Response } from "express";
import { getUserById, updateUser, updateUserProfilePicture } from "../services/user.service.js";
import { updateUserSchema, updateProfilePictureSchema } from "../schemas/user.schema.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

// Multer setup (in-memory storage, since files are uploaded directly to Cloudinary)
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// Get logged-in user profile
export async function getMe(req: Request, res: Response) {
  try {

    // `user` injected by auth middleware
    const userId = (req as any).user?.id; 
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    // Fetch user from DB using service
    const user = await getUserById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Return user profile in json format as response
    res.json(user);
  } catch (error: any) {
    console.error("Error in getMe:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// Update user info
export async function updateMe(req: Request, res: Response) {
  try {

    // Validate input using Zod schema
    const parsed = updateUserSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input", details: parsed.error.format() });
    }

    // `user` injected by auth middleware
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    // Extract fields from request body
    const { username, bio, website } = req.body;

    // Update user in DB using service
    const updatedUser = await updateUser(userId, { username, bio, website });
    res.json(updatedUser);
  } catch (error: any) {
    console.error("Error in updateMe:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// Update user profile picture
export async function updateProfilePicture(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    // If no file is uploaded → delete profile picture
    if (!req.file) {
      const updatedUser = await updateUserProfilePicture(userId, null);
      return res.json(updatedUser);
    }

    // Validate file using Zod schema
    const parsed = updateProfilePictureSchema.safeParse({ profile_picture: req.file });
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid file", details: parsed.error.format() });
    }

    // Upload to Cloudinary
    const result = cloudinary.uploader.upload_stream(
      { folder: "profile_pictures", resource_type: "image" },
      async (error, uploadedImage) => {
        if (error) {
          console.error("Cloudinary error:", error);
          return res.status(500).json({ message: "Image upload failed" });
        }

        if (!uploadedImage) {
          return res.status(500).json({ message: "No image returned from Cloudinary" });
        }

        const updatedUser = await updateUserProfilePicture(userId, uploadedImage.secure_url);
        res.json(updatedUser);
      }
    );

    result.end(req.file.buffer);
  } catch (error: any) {
    console.error("Error in updateProfilePicture:", error);
    res.status(500).json({ message: "Server error" });
  }
}