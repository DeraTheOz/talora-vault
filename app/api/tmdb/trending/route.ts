import { TmdbTrendingTitlesResponse } from "@/features/trending/types/trending";
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

  const response = await fetch(`${baseUrl}/trending/all/day?language=en-US`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: {
      revalidate: 300,
    },
  });

  if (!response.ok) {
    return NextResponse.json(
      { message: "Failed to fetch trending titles" },
      { status: response.status },
    );
  }

  const data = (await response.json()) as TmdbTrendingTitlesResponse;

  return NextResponse.json(data);
}
