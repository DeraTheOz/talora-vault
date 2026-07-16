import type { TmdbCreditsResponse } from "@/features/media/types/media";

export async function getTvCredits(id: string): Promise<TmdbCreditsResponse> {
  const response = await fetch(`/api/tmdb/series/${id}`);

  if (!response.ok) {
    throw new Error(`Unable to load credits for tv show: ${id}`);
  }

  return response.json() as Promise<TmdbCreditsResponse>;
}
