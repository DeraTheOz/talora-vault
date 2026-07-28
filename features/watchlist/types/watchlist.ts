import { TmdbNowPlayingItem } from "@/features/now-playing/types/now-playing";

/**
 * A watchlist media item — extends the base TMDB item with the timestamp
 * of when the user added it to their watchlist.
 */
export type WatchlistMediaItem = TmdbNowPlayingItem & {
  addedAt: Date;
};
