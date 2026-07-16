import type { TmdbTvDetail } from "../types/series-detail";
import { notFound } from "next/navigation";

export async function getTvDetail(id: string): Promise<TmdbTvDetail> {
  const token = process.env.TMDB_ACCESS_TOKEN;
  const baseUrl = process.env.TMDB_BASE_URL ?? "https://api.themoviedb.org/3";

  if (!token) {
    throw new Error("TMDB_ACCESS_TOKEN is missing");
  }

  const response = await fetch(`${baseUrl}/tv/${id}?language=en-US`, {
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
    throw new Error(`TMDB returned ${response.status} for tv show ${id}`);
  }

  return response.json() as Promise<TmdbTvDetail>;
}
