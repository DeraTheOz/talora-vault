import { NextResponse } from "next/server";

import {
  TmdbMovieListResponse,
  TmdbNowPlayingApiResponse,
  TmdbNowPlayingItem,
  TmdbTvListResponse,
} from "@/features/now-playing/types/now-playing";

export async function GET() {
  const token = process.env.TMDB_ACCESS_TOKEN;
  const baseUrl = process.env.TMDB_BASE_URL ?? "https://api.themoviedb.org/3";

  if (!token) {
    return NextResponse.json(
      { message: "TMDB_ACCESS_TOKEN is missing" },
      { status: 500 },
    );
  }

  try {
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 300,
      },
    };

    const [moviesRes, tvRes] = await Promise.all([
      fetch(`${baseUrl}/discover/movie`, options),
      fetch(`${baseUrl}/discover/tv`, options),
    ]);

    if (!moviesRes.ok || !tvRes.ok) {
      return NextResponse.json(
        { message: "Failed to fetch TMDB now playing content" },
        { status: 502 },
      );
    }

    const [movies, tvShows] = (await Promise.all([
      moviesRes.json(),
      tvRes.json(),
    ])) as [TmdbMovieListResponse, TmdbTvListResponse];

    const movieItems: TmdbNowPlayingItem[] = movies.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      release_date: movie.release_date,
      media_type: "movie",
      vote_average: movie.vote_average,
      popularity: movie.popularity,
    }));

    const tvItems: TmdbNowPlayingItem[] = tvShows.results.map((show) => ({
      id: show.id,
      title: show.name,
      poster_path: show.poster_path,
      backdrop_path: show.backdrop_path,
      release_date: show.first_air_date,
      media_type: "tv",
      vote_average: show.vote_average,
      popularity: show.popularity,
    }));

    const results = [...movieItems, ...tvItems].sort(
      (a, b) => b.popularity - a.popularity,
    );

    const payload: TmdbNowPlayingApiResponse = { results };

    return NextResponse.json(payload);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch now playing content",
      },
      { status: 500 },
    );
  }
}
