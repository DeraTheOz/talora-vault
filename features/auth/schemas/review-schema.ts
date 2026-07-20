import { z } from "zod";

export const reviewSchema = z.object({
  rating: z.coerce
    .number()
    .int("Choose a valid rating")
    .min(1, "Choose a rating")
    .max(10, "Rating cannot be higher than 10"),
  content: z.string().trim().max(2000, "Review is too long").optional(),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
