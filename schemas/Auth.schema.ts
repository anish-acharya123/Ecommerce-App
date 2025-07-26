import * as z from "zod";

export const signInSchema = z.object({
  emailAddress: z.string().email({ message: "Invalid email address" }),
});
export const signUpSchema = z.object({
  emailAddress: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
});

export const verifyCodeSchema = z.object({
  code: z.string().min(1, "Code is required"),
});
