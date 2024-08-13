import { z } from "zod";

export const mealSchema = z.object({
  title: z.string().trim().min(2, {
    message: "Title must be at least 2 characters long",
  }),
  summary: z.string().trim().min(3, {
    message: "Summary must be at least 3 characters long",
  }),
  instructions: z.string().trim().min(3, {
    message: "Instructions must be at least 3 characters long",
  }),
  creator: z.string().trim().min(2, {
    message: "Creator must be at least 2 characters long",
  }),
  creator_email: z.string().trim().email({
    message: "Invalid email",
  }),
  slug: z.string().length(0, {
    message: "Slug must be empty",
  }),
  image: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= 5;
    }, `Max image size is 5MB.`)
    .refine((files) => {
      return files?.[0]?.size > 0;
    }, `Image is required.`)
    .refine(
      (files) => ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});
