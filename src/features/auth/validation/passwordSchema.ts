import { z } from "zod";

export const passwordSchema = z
  .string()
  .trim()
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/[A-Z]/, { message: "At least one uppercase letter required" })
  .regex(/[a-z]/, { message: "At least one lowercase letter required" })
  .regex(/[0-9]/, { message: "At least one number required" })
  .regex(/[^A-Za-z0-9]/, {
    message: "At least one special character required",
  });
