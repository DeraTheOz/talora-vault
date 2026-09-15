import {
  TmdbPopularTvApiResponse,
  TmdbPopularTvShow,
} from "../types/popular";

export async function getPopularTv(lang: string): Promise<TmdbPopularTvShow[]> {
  const response = await fetch(`/api/tmdb/tv/popular?lang=${lang}`);

  if (!response.ok) {
    throw new Error("Unable to load popular TV shows");
  }

  const data = (await response.json()) as TmdbPopularTvApiResponse;

  return data.results;
}
