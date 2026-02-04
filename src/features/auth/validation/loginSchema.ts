import { z } from "zod";

const loginSchema = z.object({
  email: z.string().trim().min(1, { message: "Email or username is required" }),
  password: z.string().trim().min(1, { message: "Password is required" }),
});

type TLoginInputsType = z.infer<typeof loginSchema>;
export { loginSchema, type TLoginInputsType };
