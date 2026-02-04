import z from "zod";
import { passwordSchema } from "./passwordSchema";

const resetPasswordSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((input) => input.newPassword === input.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type TResetInputsType = z.infer<typeof resetPasswordSchema>;
export { resetPasswordSchema, type TResetInputsType };
