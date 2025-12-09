import { z } from "zod";

export const userSchema = z.object({
  name: z.string().max(50).min(3),
  email: z.email(),
  password: z
    .string()
    .min(8, "Password must be 8 characters long")
    .regex(
      /^(?=.*[A-Z])(?=.*\d).+$/,
      "Password must contain atleast 1 uppercase and 1 lowercase"
    ),
  role: z.enum(["ADMIN", "STUDENT"]).default("STUDENT"),
});

export type UserType = z.infer<typeof userSchema>;
