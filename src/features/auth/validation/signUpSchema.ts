import { z } from "zod";
import { passwordSchema } from "./passwordSchema";

const signUpSchema = z
  .object({
    firstName: z.string().trim().min(1, { message: "First name is required" }),

    lastName: z.string().trim().min(1, { message: "Last name is required" }),

    username: z.string().trim().min(1, { message: "Username is required" }),

    email: z.email({ message: "Invalid email address" }),
    phone: z
      .string()
      .trim()
      .min(1, { message: "Phone is required" })
      .regex(/^01[0125][0-9]{8}$/, {
        message: "Invalid Egyptian phone number",
      }),
    password: passwordSchema,

    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type TSignUpType = z.infer<typeof signUpSchema>;

export { signUpSchema, type TSignUpType };
