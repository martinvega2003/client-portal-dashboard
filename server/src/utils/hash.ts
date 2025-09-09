// Utility functions for hashing and comparing passwords

import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10; // 10 is a reasonable default for development. In production you may increase this depending on your environment

// Hash a plain text password
export const hashPassword = async (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
      return hash ? resolve(hash) : reject(err);
    });
  });
}

// Compare a plain text password with a hash, return true if they match
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      if (err) return reject(err);
      return result ? resolve(true) : resolve(false);
    });
  });
}
