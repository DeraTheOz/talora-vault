import type { WatchlistMediaType } from "@/features/watchlist/schemas/watchlist-schema";
import { getMovieDetail } from "@/features/movie/api/get-movie-detail";
import { getTvDetail } from "@/features/series/api/get-series-detail";
import type { WatchlistMediaItem } from "../types/watchlist";

type WatchlistDbItem = {
  tmdbId: number;
  mediaType: WatchlistMediaType;
  addedAt: Date;
};

/**
 * Enriches raw watchlist DB rows with full TMDB metadata.
 * Preserves the `addedAt` timestamp from the database so the client
 * can sort by "Recently added".
 *
 * @param items - Raw watchlist rows from the database (includes addedAt).
 * @returns An array of enriched media items with TMDB data + addedAt.
 */
export async function getWatchlistMedia(
  items: WatchlistDbItem[],
  locale = "en",
): Promise<WatchlistMediaItem[]> {
  return Promise.all(
    items.map(async (item) => {
      if (item.mediaType === "movie") {
        const movie = await getMovieDetail(String(item.tmdbId), locale);

        return {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          backdrop_path: movie.backdrop_path,
          release_date: movie.release_date,
          media_type: "movie" as const,
          vote_average: movie.vote_average,
          popularity: 0,
          addedAt: item.addedAt,
        };
      }

      const tv = await getTvDetail(String(item.tmdbId), locale);

      return {
        id: tv.id,
        title: tv.name,
        poster_path: tv.poster_path,
        backdrop_path: tv.backdrop_path,
        release_date: tv.first_air_date,
        media_type: "tv" as const,
        vote_average: tv.vote_average,
        popularity: 0,
        addedAt: item.addedAt,
      };
    }),
  );
}
