import { TmdbGenreApiResponse } from "@/features/movie/types/movies";
import { NextResponse } from "next/server";

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
        revalidate: 60 * 60 * 24,
      },
    };

    const response = await fetch(
      `${baseUrl}/genre/movie/list?language=en-US`,
      options,
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch movie genres" },
        { status: 502 },
      );
    }

    const data = (await response.json()) as TmdbGenreApiResponse;

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch movie genres" },
      { status: 500 },
    );
  }
}
