import { z } from "zod";

export const searchQuerySchema = z.object({
  query: z
    .string()
    .trim()
    .min(1, "Search query cannot be empty")
    .max(200, "Search query is too long"),
});

export const searchTypeSchema = z.enum(["multi", "movie", "tv"]);

export type SearchQueryInput = z.infer<typeof searchQuerySchema>;
export type SearchTypeParam = z.infer<typeof searchTypeSchema>;
