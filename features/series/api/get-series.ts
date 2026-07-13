import type {
  TvFilters,
  TmdbTvApiResponse,
} from "@/features/media/types/media";

export async function getSeries(
  page = 1,
  filters: TvFilters = {},
): Promise<TmdbTvApiResponse> {
  const searchParams = new URLSearchParams({
    page: String(page),
  });

  if (filters.genreId) {
    searchParams.set("genreId", String(filters.genreId));
  }

  if (filters.sortBy) {
    searchParams.set("sortBy", filters.sortBy);
  }

  const response = await fetch(`/api/tmdb/series?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error("Unable to load tv shows");
  }

  return response.json();
}
