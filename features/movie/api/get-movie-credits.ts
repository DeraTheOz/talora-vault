import type { TmdbCreditsResponse } from "@/features/media/types/media";

export async function getMovieCredits(
  id: string,
  lang = "en",
): Promise<TmdbCreditsResponse> {
  const response = await fetch(`/api/tmdb/movie/${id}?lang=${lang}`);

  if (!response.ok) {
    throw new Error(`Unable to load credits for movie ${id}`);
  }

  return response.json() as Promise<TmdbCreditsResponse>;
}
