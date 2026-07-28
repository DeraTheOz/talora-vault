import { TmdbSearchApiResponse } from "@/features/search/types/search";
import { NextRequest, NextResponse } from "next/server";

const SEARCH_TYPE_MAP = {
  multi: "multi",
  movie: "movie",
  tv: "tv",
} as const;

export async function GET(request: NextRequest) {
  const token = process.env.TMDB_ACCESS_TOKEN;
  const baseUrl = process.env.TMDB_BASE_URL ?? "https://api.themoviedb.org/3";

  if (!token) {
    return NextResponse.json(
      { message: "TMDB_ACCESS_TOKEN is missing" },
      { status: 500 },
    );
  }

  // Extract and validate query params
  const query = request.nextUrl.searchParams.get("q");
  const typeParam = request.nextUrl.searchParams.get("type") ?? "multi";
  const pageParam = Number(request.nextUrl.searchParams.get("page"));

  // Validate search query is present and non-empty
  if (!query || query.trim().length === 0) {
    return NextResponse.json(
      { message: "Search query is required" },
      { status: 400 },
    );
  }

  // Validate search type is one of the allowed values
  const searchType =
    typeParam in SEARCH_TYPE_MAP
      ? (typeParam as keyof typeof SEARCH_TYPE_MAP)
      : "multi";

  // Validate page param, default to 1
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  // Map type param to the TMDB endpoint path
  const tmdbEndPoint = SEARCH_TYPE_MAP[searchType];

  try {
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 120,
      },
    };

    // Build the TMDB search URL with required params
    const searchParams = new URLSearchParams({
      query: query.trim(),
      language: "en-US",
      page: String(page),
      include_adult: "false",
    });

    const response = await fetch(
      `${baseUrl}/search/${tmdbEndPoint}?${searchParams.toString()}`,
      options,
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to search titles" },
        { status: 502 },
      );
    }

    const data = (await response.json()) as TmdbSearchApiResponse;

    // For multi search, filter out "person" results
    if (searchType === "multi") {
      const filteredResults = data.results.filter(
        (item) =>
          "media_type" in item &&
          (item.media_type === "movie" || item.media_type === "tv"),
      );

      return NextResponse.json({ ...data, results: filteredResults });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to search titles" },
      { status: 500 },
    );
  }
}
