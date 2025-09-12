import { z } from "zod";

// Schema for updating username, bio, website
export const updateUserSchema = z.object({
  username: z.string().min(3).max(50).optional(),
  bio: z.string().max(500).optional().nullable(),
  website: z.string().url().optional().nullable(),
});

// Schema for uploading/updating profile picture
export const updateProfilePictureSchema = z.object({
  profile_picture: z
    .any() // multer file object
    .refine(
      (file) => file === null || (file && file.mimetype.startsWith("image/")),
      { message: "Invalid file type", }
    )
    .nullable(),
});
