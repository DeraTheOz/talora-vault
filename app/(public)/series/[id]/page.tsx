import type { Metadata } from "next";

import { auth } from "@/auth";
import { getTvDetail } from "@/features/series/api/get-series-detail";
import { getCachedUserWatchlist } from "@/features/watchlist/api/get-user-watchlist";

import SeriesFacts from "@/app/components/series/detail/series-facts";
import SeriesHero from "@/app/components/series/detail/series-hero";
import SeriesReviewForm from "@/app/components/series/detail/series-review-form";
import SeriesStreamingPreview from "@/app/components/series/detail/series-streaming-preview";
import EpisodeSelector from "@/app/components/series/episodes/episode-selector";
import TvCast from "@/app/components/series/detail/series-cast";
import SimilarTvShows from "@/app/components/series/detail/similar-series";

type SeriesPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: SeriesPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const tvShow = await getTvDetail(id);

    return {
      title: `${tvShow.name} | Talora Vault`,
      description:
        tvShow.overview ||
        `View ${tvShow.name}, episodes, ratings, cast, similar series, reviews, and legal streaming options on Talora Vault.`,
      openGraph: {
        title: `${tvShow.name} | Talora Vault`,
        description: tvShow.overview,
        type: "video.tv_show",
      },
    };
  } catch {
    return {
      title: "TV Show | Talora Vault",
      description:
        "View episodes, ratings, cast, similar series, reviews, and legal streaming options on Talora Vault.",
    };
  }
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { id } = await params;
  const tvShow = await getTvDetail(id);

  // Check watchlist on the server
  const session = await auth();
  const watchlist = session?.user
    ? await getCachedUserWatchlist(session.user.id)
    : [];
  const isBookmarked = watchlist.some(
    (item) => item.tmdbId === Number(id) && item.mediaType === "tv",
  );

  return (
    <div className="pb-6 mb-16 xl:pr-8">
      <SeriesHero tvShow={tvShow} isBookmarked={isBookmarked} />
      <SeriesFacts tvShow={tvShow} />

      <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-8">
          <EpisodeSelector
            tvShowId={String(tvShow.id)}
            seasons={tvShow.seasons}
          />
          <SeriesStreamingPreview series={tvShow} />
          <TvCast id={id} />
          <SeriesReviewForm tmdbId={Number(id)} />
        </div>

        <div>
          <SimilarTvShows id={id} />
        </div>
      </div>
    </div>
  );
}
