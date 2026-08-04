import { NextRequest, NextResponse } from "next/server";

import type { TmdbTvSeasonDetail } from "@/features/series/types/series-detail";
import { toTmdbLocale } from "@/lib/tmdb/tmdb-locale";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; seasonNumber: string }> },
) {
  const { id, seasonNumber } = await params;
  const lang = request.nextUrl.searchParams.get("lang") ?? undefined;
  const token = process.env.TMDB_ACCESS_TOKEN;
  const baseUrl = process.env.TMDB_BASE_URL ?? "https://api.themoviedb.org/3";

  if (!token) {
    return NextResponse.json(
      { message: "TMDB_ACCESS_TOKEN is missing" },
      { status: 500 },
    );
  }

  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 3600 },
  };

  try {
    const response = await fetch(
      `${baseUrl}/tv/${id}/season/${seasonNumber}?language=${toTmdbLocale(lang ?? "en")}`,
      options,
    );

    if (response.status === 404) {
      return NextResponse.json(
        { message: "Season not found" },
        { status: 404 },
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch season episodes" },
        { status: 502 },
      );
    }

    const data = (await response.json()) as TmdbTvSeasonDetail;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Season number fetch error:", error);

    return NextResponse.json(
      { message: "Failed to fetch season number" },
      { status: 500 },
    );
  }
}
