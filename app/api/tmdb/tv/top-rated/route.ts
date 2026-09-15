import { NextRequest, NextResponse } from "next/server";

import { TmdbTopRatedTvApiResponse } from "@/features/top-rated/types/top-rated";
import { toTmdbLocale } from "@/lib/tmdb/tmdb-locale";

export async function GET(request: NextRequest) {
  const token = process.env.TMDB_ACCESS_TOKEN;
  const baseUrl = process.env.TMDB_BASE_URL ?? "https://api.themoviedb.org/3";
  const lang = request.nextUrl.searchParams.get("lang") ?? undefined;

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

    const response = await fetch(
      `${baseUrl}/tv/top_rated?language=${toTmdbLocale(lang ?? "en")}`,
      options,
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch top rated TV shows" },
        { status: 502 },
      );
    }

    const data = (await response.json()) as TmdbTopRatedTvApiResponse;

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch top rated TV shows" },
      { status: 500 },
    );
  }
}