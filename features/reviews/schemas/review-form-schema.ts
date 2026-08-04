import { z } from "zod";

export function createReviewFormSchema(t: (key: string) => string) {
  return z.object({
    rating: z.coerce
      .number({ error: t("chooseRating") })
      .int(t("chooseValidRating"))
      .min(1, t("chooseRating"))
      .max(10, t("ratingMax10")),
    content: z.string().trim().max(2000, t("reviewTooLong")).optional(),
  });
}

export type ReviewFormValues = z.input<
  ReturnType<typeof createReviewFormSchema>
>;

/**
 * What onSubmit receives after Zod parses/coerces it.
 */
export type ReviewFormInput = z.output<
  ReturnType<typeof createReviewFormSchema>
>;
