import { z } from "zod";

export const verifySchema = z.object({
  otp: z
    .string()
    .length(6, { message: "OTP must be 6 digits" })
    .regex(/^\d+$/, { message: "OTP must contain only numbers" }),
});

export type TVerifyType = z.infer<typeof verifySchema>;
