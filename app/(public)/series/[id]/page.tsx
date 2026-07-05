import type { Metadata } from "next";

import SeriesFacts from "@/app/components/series/detail/series-facts";
import SeriesHero from "@/app/components/series/detail/series-hero";
import SeriesReviewForm from "@/app/components/series/detail/series-review-form";
import SeriesStreamingPreview from "@/app/components/series/detail/series-streaming-preview";
import SimilarSeriesList from "@/app/components/series/detail/similar-series";
import { series } from "@/app/data/series-detail";
import Cast from "@/app/components/media/cast/cast";
import EpisodeSelector from "@/app/components/series/episodes/episode-selector";

type SeriesPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: SeriesPageProps): Promise<Metadata> {
  const { id } = await params;

  // Replace with TMDB TV detail
  void id;

  return {
    title: `${series.title} | Talora Vault`,
    description: `View ${series.title}, episodes, ratings, cast, similar series, reviews, and legal streaming options on Talora Vault.`,
    openGraph: {
      title: `${series.title} | Talora Vault`,
      description: series.overview,
      type: "video.tv_show",
    },
  };
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { id } = await params;

  // Keep the route param ready for TMDB integration.
  void id;

  return (
    <div className="pb-6 mb-16 sm:mb-0 xl:pr-8">
      <SeriesHero series={series} />
      <SeriesFacts series={series} />

      <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="xl:col-start-1 xl:row-start-1 space-y-6">
          <EpisodeSelector episodes={series.episodeList} />
          <SeriesStreamingPreview series={series} />
        </div>

        <div className="xl:col-start-1 xl:row-start-2">
          <Cast cast={series.cast} />
        </div>

        <div className="xl:col-start-1 xl:row-start-3">
          <SeriesReviewForm />
        </div>

        <div className="xl:col-start-2 xl:row-span-3 xl:row-start-1">
          <SimilarSeriesList series={series.similarSeries} />
        </div>
      </div>
    </div>
  );
}
