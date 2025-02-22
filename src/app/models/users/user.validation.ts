import { z } from "zod";

const userValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.string().optional(),
});

export default userValidationSchema;
