import type { TmdbMovieDetail } from "../types/movie-detail";
import { notFound } from "next/navigation";
import { toTmdbLocale } from "@/lib/tmdb/tmdb-locale";

export async function getMovieDetail(
  id: string,
  locale = "en",
): Promise<TmdbMovieDetail> {
  const token = process.env.TMDB_ACCESS_TOKEN;
  const baseUrl = process.env.TMDB_BASE_URL ?? "https://api.themoviedb.org/3";

  if (!token) {
    throw new Error("TMDB_ACCESS_TOKEN is missing");
  }

  const response = await fetch(
    `${baseUrl}/movie/${id}?language=${toTmdbLocale(locale)}`,
    {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 3600 },
  });

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error(`TMDB returned ${response.status} for movie ${id}`);
  }

  return response.json() as Promise<TmdbMovieDetail>;
}
