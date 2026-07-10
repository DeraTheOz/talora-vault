import { TmdbTrendingTitlesApiResponse } from "../types/trending";

export async function getTrending(): Promise<TmdbTrendingTitlesApiResponse> {
  const response = await fetch("/api/tmdb/trending");

  if (!response.ok) {
    throw new Error("Unable to load trending titles");
  }

  return response.json();
}
