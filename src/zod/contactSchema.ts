import { z } from "zod";

export const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
    .max(100, { message: "Name too long." }),

  email: z
    .string()
    .email({ message: "Email no válido" }),

  content: z
    .string()
    .min(10, { message: "El mensaje debe tener al menos 10 caracteres" })
    .max(1000, { message: "Message too long." }),
});
