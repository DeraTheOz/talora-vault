import { NextRequest, NextResponse } from "next/server";

import type {
  TmdbTvApiResponse,
  TvSortOption,
} from "@/features/media/types/media";

const SORT_OPTIONS = new Set<TvSortOption>([
  "popularity.desc",
  "popularity.asc",
  "vote_average.desc",
  "vote_average.asc",
  "first_air_date.desc",
  "first_air_date.asc",
  "name.asc",
  "name.desc",
]);

export async function GET(request: NextRequest) {
  const token = process.env.TMDB_ACCESS_TOKEN;
  const baseUrl = process.env.TMDB_BASE_URL ?? "https://api.themoviedb.org/3";

  const pageParam = Number(request.nextUrl.searchParams.get("page"));
  const genreIdParam = Number(request.nextUrl.searchParams.get("genreId"));
  const sortByParam = request.nextUrl.searchParams.get("sortBy");

  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;
  const genreId =
    Number.isFinite(genreIdParam) && genreIdParam > 0 ? genreIdParam : null;

  const sortBy =
    sortByParam && SORT_OPTIONS.has(sortByParam as TvSortOption)
      ? sortByParam
      : "popularity.desc";

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

    const searchParams = new URLSearchParams({
      language: "en-US",
      page: String(page),
      sort_by: sortBy,
      include_adult: "false",
      include_video: "false",
    });

    if (genreId) {
      searchParams.set("with_genres", String(genreId));
    }

    const response = await fetch(
      `${baseUrl}/discover/tv?${searchParams.toString()}`,
      options,
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch tv shows" },
        { status: 502 },
      );
    }

    const data = (await response.json()) as TmdbTvApiResponse;

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch tv shows" },
      { status: 500 },
    );
  }
}
