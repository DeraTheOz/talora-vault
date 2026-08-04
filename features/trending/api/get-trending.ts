import { TmdbTrendingTitlesApiResponse } from "../types/trending";

export async function getTrending(lang: string): Promise<TmdbTrendingTitlesApiResponse> {
  const response = await fetch(`/api/tmdb/trending?lang=${lang}`);

  if (!response.ok) {
    throw new Error("Unable to load trending titles");
  }

  return response.json();
}
