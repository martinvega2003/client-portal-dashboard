// Types for user data

export type DbUser = {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  created_at?: string;      
};

export type PublicUser = {
  id: number;
  username: string;
  email: string;
  created_at?: string;
};
