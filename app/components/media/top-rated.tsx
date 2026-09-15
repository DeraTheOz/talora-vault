"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useTopRated } from "@/features/top-rated/hooks/use-top-rated";
import { MediaGridSkeleton } from "./media-skeletons";
import MediaErrorState from "./media-error-state";
import TabToggle from "../ui/tab-toggle";
import PopularMediaCard from "./card/popular-media-card";

interface TopRatedProps {
  id: string;
}

export default function TopRated({ id }: TopRatedProps) {
  const t = useTranslations("home");
  const {
    data = [],
    isLoading,
    error,
    refetch,
    isFetching,
    activeTab,
    setActiveTab,
  } = useTopRated();

  const [hasLoaded, setHasLoaded] = useState(false);

  if (!hasLoaded && data.length > 0) {
    setHasLoaded(true);
  }

  const tabs = [
    { id: "movie", label: t("movies") },
    { id: "tv", label: t("tvSeries") },
  ];

  const isFirstLoad = isLoading && !hasLoaded;

  if (error) {
    return (
      <MediaErrorState
        message={t("topRatedError")}
        onRetry={() => void refetch()}
        isRetrying={isFetching}
      />
    );
  }

  const items = data.slice(0, 20);

  return (
    <section
      aria-labelledby={id}
      className="space-y-4 md:space-y-6 mb-16 px-4 sm:px-6 xl:px-8">
      <div className="flex flex-wrap items-center gap-3 md:gap-4">
        {isFirstLoad ? (
          <div className="h-8 w-28 md:h-10 md:w-36 animate-pulse rounded bg-talora-semi-dark-blue" />
        ) : (
          <h2
            id={id}
            className="text-2xl font-normal md:text-[2rem] md:leading-tight">
            {t("topRated")}
          </h2>
        )}
        <TabToggle
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab as "movie" | "tv")}
          ariaLabel={t("topRatedFilterAria")}
        />
      </div>

      <div
        id={`panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}>
        {isFirstLoad || (isFetching && items.length === 0) ? (
          <MediaGridSkeleton count={20} />
        ) : items.length === 0 ? null : (
          <div className="grid max-[369px]:grid-cols-1 grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-3 md:gap-x-7 md:gap-y-6 xl:grid-cols-[repeat(auto-fill,minmax(17.5rem,1fr))] xl:gap-x-10 xl:gap-y-8">
            {items.map((item) => (
              <PopularMediaCard
                key={`${activeTab}-${item.id}`}
                item={item}
                mediaType={activeTab}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
