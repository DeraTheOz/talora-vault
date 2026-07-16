import { NextRequest, NextResponse } from "next/server";

import type { TmdbCreditsResponse } from "@/features/media/types/media";

const TOP_CAST_LIMIT = 20;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
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
      next: { revalidate: 3600 },
    };

    const response = await fetch(
      `${baseUrl}/tv/${id}/credits?language=en-US`,
      options,
    );

    if (response.status === 404) {
      return NextResponse.json(
        { message: "Tv show not found" },
        { status: 404 },
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch credits" },
        { status: 502 },
      );
    }

    const data = (await response.json()) as TmdbCreditsResponse;

    // Return top 20 cast members sorted by billing order
    const topCast = data.cast
      .sort((a, b) => a.order - b.order)
      .slice(0, TOP_CAST_LIMIT);

    return NextResponse.json({ cast: topCast, crew: data.crew });
  } catch (error) {
    console.error("Credits fetch error:", error);

    return NextResponse.json(
      { message: "Failed to fetch credits" },
      { status: 500 },
    );
  }
}
