import { TmdbTopRatedApiResponse } from "../types/top-rated";

export async function getTopRated(lang: string): Promise<TmdbTopRatedApiResponse> {
  const response = await fetch(`/api/tmdb/top-rated?lang=${lang}`);

  if (!response.ok) {
    throw new Error("Unable to load top rated content");
  }

  return response.json();
}
