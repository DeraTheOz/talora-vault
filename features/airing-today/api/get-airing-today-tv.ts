import {
  TmdbAiringTodayApiResponse,
  TmdbAiringTodayTvShow,
} from "../types/airing-today";

export async function getAiringTodayTv(
  lang: string,
): Promise<TmdbAiringTodayTvShow[]> {
  const response = await fetch(`/api/tmdb/tv/airing-today?lang=${lang}`);

  if (!response.ok) {
    throw new Error("Unable to load airing today TV shows");
  }

  const data = (await response.json()) as TmdbAiringTodayApiResponse;

  return data.results;
}
