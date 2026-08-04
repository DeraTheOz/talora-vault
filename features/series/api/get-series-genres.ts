import type { TmdbGenreApiResponse } from "@/features/media/types/media";

export async function getSeriesGenres(lang = "en"): Promise<TmdbGenreApiResponse> {
  const response = await fetch(`/api/tmdb/series/genres?lang=${lang}`);

  if (!response.ok) {
    throw new Error("Unable to load tv genres");
  }

  return response.json();
}
