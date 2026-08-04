import type { TmdbCreditsResponse } from "@/features/media/types/media";

export async function getTvCredits(
  id: string,
  lang = "en",
): Promise<TmdbCreditsResponse> {
  const response = await fetch(`/api/tmdb/series/${id}?lang=${lang}`);

  if (!response.ok) {
    throw new Error(`Unable to load credits for tv show: ${id}`);
  }

  return response.json() as Promise<TmdbCreditsResponse>;
}
