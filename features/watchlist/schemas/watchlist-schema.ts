import { z } from "zod";

export const watchlistMediaTypeSchema = z.enum(["movie", "tv"]);

export const watchlistItemSchema = z.object({
  tmdbId: z.coerce.number().int().positive(),
  mediaType: watchlistMediaTypeSchema,
});

export type WatchlistInput = z.infer<typeof watchlistItemSchema>;
export type WatchlistMediaType = z.infer<typeof watchlistMediaTypeSchema>;
