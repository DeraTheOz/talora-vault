import { z } from "zod";

export const reviewMediaTypeSchema = z.enum(["movie", "tv"]);

export const reviewSchema = z.object({
  tmdbId: z.coerce.number().int().positive("Invalid media ID"),
  mediaType: reviewMediaTypeSchema,
  rating: z.coerce
    .number()
    .int()
    .min(1, "Rating must be at least 1")
    .max(10, "Rating cannot exceed 10"),
  content: z
    .string()
    .max(2000, "Review cannot exceed 2000 characters")
    .optional()
    .nullable()
    .transform((val) => (val === "" || val === undefined ? null : val)),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
export type ReviewMediaType = z.infer<typeof reviewMediaTypeSchema>;
