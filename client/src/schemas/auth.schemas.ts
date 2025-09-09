import { z } from 'zod';

// Registration schema
export const registerSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Confirm password is required" })

  // Custom validation to check if password and confirmPassword match
}).superRefine((data, ctx) => { // data = the entire object being validated, ctx = context for adding issues
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: "custom", // custom validation error
      path: ["confirmPassword"], // path to the field with the error
      message: "Passwords do not match", // error message
    });
  }
});

// Login schema
export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6, { message: "Password is required" }),
});
