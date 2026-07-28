import type {
  SearchResult,
  TmdbSearchMovieResult,
  TmdbSearchResultItem,
  TmdbSearchTvResult,
} from "@/features/search/types/search";
import { formatReleaseYear } from "@/lib/helpers/format";

/**
 * Normalizes raw TMDB search results into a clean SearchResult shape.
 * Filters out non-media items (such as "person" items from multi-search)
 * and safely infers missing media_type fields.
 */
export function normalizeSearchResults(
  items: TmdbSearchResultItem[] | undefined | null,
): SearchResult[] {
  if (!items || !Array.isArray(items)) return [];

  // Filter out non-media items (e.g. "person" items in multi-search)
  const mediaItems = items.filter(
    (item): item is TmdbSearchMovieResult | TmdbSearchTvResult =>
      !("media_type" in item) ||
      item.media_type === "movie" ||
      item.media_type === "tv",
  );

  return mediaItems.map((item) => {
    // Infer mediaType if media_type is omitted (single movie/tv search endpoints)
    const mediaType = item.media_type ?? ("title" in item ? "movie" : "tv");
    const title = "title" in item ? item.title : item.name;
    const releaseDate =
      "release_date" in item ? item.release_date : item.first_air_date;

    return {
      id: item.id,
      title: title || "Untitled",
      posterPath: item.poster_path ?? null,
      releaseYear: formatReleaseYear(releaseDate),
      voteAverage: item.vote_average ?? 0,
      mediaType,
    };
  });
}
