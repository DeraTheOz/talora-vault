import type { TmdbCreditsResponse } from "@/features/media/types/media";

export async function getMovieCredits(
  id: string,
): Promise<TmdbCreditsResponse> {
  const response = await fetch(`/api/tmdb/movie/${id}`);

  if (!response.ok) {
    throw new Error(`Unable to load credits for movie ${id}`);
  }

  return response.json() as Promise<TmdbCreditsResponse>;
}
