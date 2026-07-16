import { NextRequest, NextResponse } from "next/server";
import { TmdbSimilarMediaResponse } from "@/features/media/types/media";

const RESULT_LIMIT = 14;

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

  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 1800 },
  };

  try {
    const [similarRes, recommendedRes] = await Promise.all([
      fetch(`${baseUrl}/tv/${id}/similar?language=en-US&page=1`, options),
      fetch(
        `${baseUrl}/tv/${id}/recommendations?language=en-US&page=1`,
        options,
      ),
    ]);

    if (similarRes.status === 404) {
      return NextResponse.json(
        { message: "Tv show not found" },
        { status: 404 },
      );
    }

    // Fallback if either endpoints fails
    const similar: TmdbSimilarMediaResponse = similarRes.ok
      ? ((await similarRes.json()) as TmdbSimilarMediaResponse)
      : { results: [] };
    const recommended: TmdbSimilarMediaResponse = recommendedRes.ok
      ? ((await recommendedRes.json()) as TmdbSimilarMediaResponse)
      : { results: [] };

    // Merge both lists, deduplicate by id, prefer recommendations first
    const seenIds = new Set<number>();
    const merged = [...recommended.results, ...similar.results].filter(
      (tvShow) => {
        if (seenIds.has(tvShow.id)) return false;
        seenIds.add(tvShow.id);
        return true;
      },
    );

    const results = merged.slice(0, RESULT_LIMIT);

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Similar Tv show fetch error:", error);

    return NextResponse.json(
      { message: "Failed to fetch similar Tv shows" },
      { status: 500 },
    );
  }
}
