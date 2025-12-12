import { z } from "zod";

export const articleRequestSchema = z.object({
  url: z
    .string()
    .min(8, { message: "URL must be at least 8 characters long" })
    .url({ message: "URL must be a valid link" }),

  title: z
    .string()
    .min(4, { message: "Title must be at least 4 characters long" })
    .max(255, { message: "Title must be shorter than 255 characters" }),

description: z
    .string()
    .max(1000, { message: "Description must be under 1000 characters" })
    .optional()
    // CAMBIO CLAVE: Usa || "" o ?? "" para asegurar que el resultado SIEMPRE sea string.
    // .transform(val => val?.trim() ?? ""), 
});
