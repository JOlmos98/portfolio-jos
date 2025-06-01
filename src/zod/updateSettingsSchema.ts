import { z } from "zod";

export const updateSettingsSchema = z.object({
  userId: z.string(),

  avatarUrl: z
    .string()
    .min(1, { message: "Image URL is required" })
    .url("Must be a valid URL"),

  phone: z
    .string()
    .optional()
    .transform(val => val?.trim() === "" ? undefined : val?.trim())
    .refine(
      val =>
        val === undefined ||
        /^\+?[0-9\s\-]{7,}$/.test(val),
      { message: "Phone must start with '+' and have at least 7 digits" }
    ),

  bio: z
    .string()
    .max(160, { message: "Bio must be less than 160 characters" })
    .optional(),

  website: z
    .string()
    .optional()
    .transform(val => val === "" ? undefined : val)
    .pipe(z.string().url("Website must be a valid URL").optional()),
});
