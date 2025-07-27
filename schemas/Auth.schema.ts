import * as z from "zod";

export const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  full_name: z.string().min(4, "Full name is required"),
  avatar_url: z.string().url("Must be a valid image URL").optional(),
});

export const verifyCodeSchema = z.object({
  code: z.string().min(1, "Code is required"),
});
