import { z } from "zod";

export const reviewFormSchema = z.object({
  rating: z.coerce
    .number({ error: "Choose a rating" })
    .int("Choose a valid rating")
    .min(1, "Choose a rating")
    .max(10, "Rating cannot be higher than 10"),
  content: z.string().trim().max(2000, "Review is too long").optional(),
});

/**
 * What the form holds before Zod parses it.
 */
export type ReviewFormValues = z.input<typeof reviewFormSchema>;

/**
 * What onSubmit receives after Zod parses/coerces it.
 */
export type ReviewFormInput = z.output<typeof reviewFormSchema>;
