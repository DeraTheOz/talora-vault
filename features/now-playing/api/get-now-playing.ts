import {
  TmdbNowPlayingApiResponse,
  TmdbNowPlayingItem,
} from "../types/now-playing";

export async function getNowPlaying(): Promise<TmdbNowPlayingItem[]> {
  const response = await fetch("/api/tmdb/now-playing");

  if (!response.ok) {
    throw new Error("Unable to load now playing content");
  }

  const data = (await response.json()) as TmdbNowPlayingApiResponse;

  return data.results;
}
