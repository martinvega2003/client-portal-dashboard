import { DbUser } from "../types.js";
import { pool } from "../database.js";
import { v2 as cloudinary } from "cloudinary";

// configure Cloudinary using env vars
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Get user by ID
export async function getUserById(userId: number): Promise<DbUser | null> {
  const query = `SELECT id, username, email, bio, website, profile_picture, created_at
                 FROM users WHERE id = $1`;

  const { rows } = await pool.query(query, [userId]);
  if (rows.length === 0) return null;
  return rows[0] as DbUser;
}

// Update user info (username, bio, website)
export async function updateUser(
  userId: number,
  updates: { username?: string, bio?: string, website?: string }
): Promise<DbUser | null> {
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  if (updates.username !== undefined) {
    fields.push(`username = $${idx++}`);
    values.push(updates.username);
  }

  if (updates.bio !== undefined) {
    fields.push(`bio = $${idx++}`);
    values.push(updates.bio);
  }

  if (updates.website !== undefined) {
    fields.push(`website = $${idx++}`);
    values.push(updates.website);
  }

  if (fields.length === 0) return await getUserById(userId);

  values.push(userId);

  const query = `
    UPDATE users
    SET ${fields.join(", ")}
    WHERE id = $${idx}
    RETURNING id, username, email, bio, website, profile_picture, created_at
  `;

  const { rows } = await pool.query(query, values);
  return rows[0] as DbUser;
}

// Update user profile picture (upload to Cloudinary)
export async function updateUserProfilePicture(
  userId: number,
  filePath: string | null
): Promise<DbUser | null> {
  if (filePath === null) {
    const query = `
      UPDATE users
      SET profile_picture = NULL
      WHERE id = $1
      RETURNING id, username, email, bio, website, profile_picture, created_at
    `;
    const { rows } = await pool.query(query, [userId]);
    return rows[0] as DbUser;
  }

  // Upload to Cloudinary
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "profile_pictures",
      use_filename: true,
      unique_filename: true,
      overwrite: false,
    });

    const query = `
      UPDATE users
      SET profile_picture = $1
      WHERE id = $2
      RETURNING id, username, email, bio, website, profile_picture, created_at
    `;
    const values = [result.secure_url, userId];

    const { rows } = await pool.query(query, values);
    return rows[0] as DbUser;
  } catch (err) {
    console.error("Cloudinary upload failed:", err);
    throw new Error("Failed to upload profile picture");
  }
}