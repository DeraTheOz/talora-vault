import { getTmdbImageUrl } from "@/lib/tmdb/tmdb-image";
import type { SimilarMediaCardItem } from "@/features/media/types/media";
import { formatReleaseYear } from "@/lib/helpers/format";

export function toSimilarMediaCardItem(
  item: {
    id: number;
    title?: string;
    name?: string;
    backdrop_path: string | null;
    poster_path: string | null;
    release_date?: string | null;
    first_air_date?: string | null;
  },
  mediaType: "movie" | "tv",
): SimilarMediaCardItem {
  const image = item.backdrop_path
    ? getTmdbImageUrl(item.backdrop_path, "w500")
    : item.poster_path
      ? getTmdbImageUrl(item.poster_path, "w500")
      : null;

  return {
    id: String(item.id),
    title: item.title ?? item.name ?? "Untitled",
    image,
    year: formatReleaseYear(item.release_date || item.first_air_date),
    mediaType,
  };
}
