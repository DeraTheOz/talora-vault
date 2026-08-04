import { db } from "@/db/client";
import { reviews } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { cache } from "react";
import { getMovieDetail } from "@/features/movie/api/get-movie-detail";
import { getTvDetail } from "@/features/series/api/get-series-detail";

export type UserReviewItem = {
  tmdbId: number;
  title: string;
  mediaType: "movie" | "tv";
  rating: number;
  content: string | null;
  createdAt: Date;
};

export const getCachedUserReviews = cache(async (userId: string) => {
  return db
    .select()
    .from(reviews)
    .where(eq(reviews.userId, userId))
    .orderBy(desc(reviews.createdAt));
});

export async function enrichReviewsWithTmdbData(
  items: Array<{ tmdbId: number; mediaType: "movie" | "tv"; rating: number; content: string | null; createdAt: Date }>,
  locale = "en",
): Promise<UserReviewItem[]> {
  return Promise.all(
    items.map(async (item) => {
      if (item.mediaType === "movie") {
        const movie = await getMovieDetail(String(item.tmdbId), locale);
        return {
          tmdbId: item.tmdbId,
          title: movie.title,
          mediaType: "movie" as const,
          rating: item.rating,
          content: item.content,
          createdAt: item.createdAt,
        };
      }

      const tv = await getTvDetail(String(item.tmdbId), locale);
      return {
        tmdbId: item.tmdbId,
        title: tv.name,
        mediaType: "tv" as const,
        rating: item.rating,
        content: item.content,
        createdAt: item.createdAt,
      };
    }),
  );
}
