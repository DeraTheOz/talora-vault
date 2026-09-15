"use client";

import { useTranslations } from "next-intl";
import { useAiringToday } from "@/features/airing-today/hooks/use-airing-today";
import { MediaSkeleton } from "./media-skeletons";
import MediaErrorState from "./media-error-state";
import TvShowCard from "./card/tv-show-card";

interface AiringTodayProps {
  id: string;
}

export default function AiringToday({ id }: AiringTodayProps) {
  const t = useTranslations("home");
  const { data = [], isLoading, error, refetch, isFetching } = useAiringToday();

  if (isLoading) {
    return <MediaSkeleton />;
  }

  if (error) {
    return (
      <MediaErrorState
        message={t("airingTodayError")}
        onRetry={() => void refetch()}
        isRetrying={isFetching}
      />
    );
  }

  const items = data.slice(0, 20);

  if (items.length === 0) return null;

  return (
    <section
      aria-labelledby={id}
      className="space-y-4 md:space-y-6 mb-16 px-4 sm:px-6 xl:px-8">
      <h2
        id={id}
        className="text-2xl font-normal md:text-[2rem] md:leading-tight">
        {t("airingToday")}
      </h2>

      <div className="grid max-[369px]:grid-cols-1 grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-3 md:gap-x-7 md:gap-y-6 xl:grid-cols-[repeat(auto-fill,minmax(17.5rem,1fr))] xl:gap-x-10 xl:gap-y-8">
        {items.map((show) => (
          <TvShowCard key={show.id} tvShow={show} />
        ))}
      </div>
    </section>
  );
}
