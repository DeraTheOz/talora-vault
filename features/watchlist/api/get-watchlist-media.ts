import type { TmdbNowPlayingItem } from "@/features/now-playing/types/now-playing";
import type { WatchlistMediaType } from "@/features/watchlist/schemas/watchlist-schema";
import { getMovieDetail } from "@/features/movie/api/get-movie-detail";
import { getTvDetail } from "@/features/series/api/get-series-detail";

type WatchlistDbItem = {
  tmdbId: number;
  mediaType: WatchlistMediaType;
};

export async function getWatchlistMedia(
  items: WatchlistDbItem[],
): Promise<TmdbNowPlayingItem[]> {
  return Promise.all(
    items.map(async (item) => {
      if (item.mediaType === "movie") {
        const movie = await getMovieDetail(String(item.tmdbId));

        return {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          backdrop_path: movie.backdrop_path,
          release_date: movie.release_date,
          media_type: "movie" as const,
          vote_average: movie.vote_average,
          popularity: 0,
        };
      }

      const tv = await getTvDetail(String(item.tmdbId));

      return {
        id: tv.id,
        title: tv.name,
        poster_path: tv.poster_path,
        backdrop_path: tv.backdrop_path,
        release_date: tv.first_air_date,
        media_type: "tv" as const,
        vote_average: tv.vote_average,
        popularity: 0,
      };
    }),
  );
}
