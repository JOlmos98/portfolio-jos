import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),

  last_name: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long" }),

  email: z
    .string()
    .email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),

  phone: z
    .string()
    .min(7, { message: "Phone must be at least 7 digits long and contain only numbers" })
    .regex(/^[0-9]+$/, { message: "Phone must contain only numbers" })
    .optional(),

  bio: z
    .string()
    .max(160, { message: "Bio must be less than 160 characters" })
    .optional(),

  website: z
    .string()
    .url({ message: "Website must be a valid URL" })
    .optional(),

  subscribe: z
    .boolean()
    .optional(),

});
