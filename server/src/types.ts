// Types for user data

export type DbUser = {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  role: string;                 // always "agency" for now
  profile_picture: string | null;
  bio: string | null;
  website: string | null;
  created_at?: string;
};

export type PublicUser = {
  id: number;
  username: string;
  email: string;
  role: string;                 // needed for access control later
  profile_picture: string | null;
  bio: string | null;
  website: string | null;
  created_at?: string;
};
