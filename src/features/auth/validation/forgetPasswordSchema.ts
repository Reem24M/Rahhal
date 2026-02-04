import z from "zod";

const forgetPasswordSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
});

type TForgetPasswordType = z.infer<typeof forgetPasswordSchema>;

export { forgetPasswordSchema, type TForgetPasswordType };
