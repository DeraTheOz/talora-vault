import {
  TmdbOnTheAirApiResponse,
  TmdbOnTheAirTvShow,
} from "../types/on-the-air";

export async function getOnTheAirTv(
  lang: string,
): Promise<TmdbOnTheAirTvShow[]> {
  const response = await fetch(`/api/tmdb/tv/on-the-air?lang=${lang}`);

  if (!response.ok) {
    throw new Error("Unable to load on the air TV shows");
  }

  const data = (await response.json()) as TmdbOnTheAirApiResponse;

  return data.results;
}
