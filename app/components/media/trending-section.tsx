"use client";

import { useTranslations } from "next-intl";
import { useTrendingTitles } from "@/features/trending/hooks/use-trending-titles";
import TrendingMediaCard from "./card/trending-media-card";
import { TrendingSectionSkeleton } from "./media-skeletons";
import MediaErrorState from "./media-error-state";

interface TrendingMediaProps {
  id: string;
}

export default function TrendingSection({ id }: TrendingMediaProps) {
  const t = useTranslations("home");
  const { data, isLoading, error, refetch, isFetching } = useTrendingTitles();

  if (isLoading) {
    return <TrendingSectionSkeleton />;
  }

  if (error) {
    return (
      <MediaErrorState
        message={t("trendingError")}
        onRetry={() => void refetch()}
        isRetrying={isFetching}
      />
    );
  }

  const trendingTitles = data?.results ?? [];

  if (trendingTitles.length === 0) return null;

  return (
    <section
      aria-labelledby={id}
      className="min-w-0 overflow-hidden space-y-4 md:space-y-6">
      <h1
        id={id}
        className="text-2xl font-normal md:text-[2rem] md:leading-tight">
        {t("trending")}
      </h1>

      <div
        className="-mx-4 flex snap-x gap-4 overflow-x-auto pl4 px-4 pb-2 scrollbar-none md:mx-0 md:gap-10 xl:px-0 xl:pr-8"
        aria-label={t("trendingListLabel")}>
        {trendingTitles.map((trendingTitle) => (
          <TrendingMediaCard
            key={`${trendingTitle.media_type}-${trendingTitle.id}`}
            trendingTitle={trendingTitle}
          />
        ))}
      </div>
    </section>
  );
}
