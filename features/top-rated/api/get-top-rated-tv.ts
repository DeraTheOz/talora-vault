import {
  TmdbTopRatedTvApiResponse,
  TmdbTopRatedTvShow,
} from "../types/top-rated";

export async function getTopRatedTv(
  lang: string,
): Promise<TmdbTopRatedTvShow[]> {
  const response = await fetch(`/api/tmdb/tv/top-rated?lang=${lang}`);

  if (!response.ok) {
    throw new Error("Unable to load top rated TV shows");
  }

  const data = (await response.json()) as TmdbTopRatedTvApiResponse;

  return data.results;
}