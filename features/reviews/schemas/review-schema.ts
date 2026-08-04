import { z } from "zod";

export const reviewMediaTypeSchema = z.enum(["movie", "tv"]);

export function createReviewSchema(t: (key: string) => string) {
  return z.object({
    tmdbId: z.coerce.number().int().positive(t("invalidMediaId")),
    mediaType: reviewMediaTypeSchema,
    rating: z.coerce
      .number()
      .int()
      .min(1, t("ratingMin1"))
      .max(10, t("ratingExceeds10")),
    content: z
      .string()
      .max(2000, t("reviewExceeds2000"))
      .optional()
      .nullable()
      .transform((val) => (val === "" || val === undefined ? null : val)),
  });
}

export type ReviewInput = z.infer<ReturnType<typeof createReviewSchema>>;
export type ReviewMediaType = z.infer<typeof reviewMediaTypeSchema>;
