"use client";

import {
  MediaGridSkeleton,
  MediaSectionSkeleton,
} from "../media/media-skeletons";

import SeriesCard from "./series-card";
import MediaFilter from "../media/filter/media-filter";
import MediaErrorState from "../media/media-error-state";

import { tvSortOptions } from "@/lib/constants/sort-options";
import { useSeriesSection } from "@/features/series/hooks/use-series-section";

interface TvProps {
  title: string;
  id: string;
}

export default function SeriesSection({ title, id }: TvProps) {
  const {
    series,
    genres,
    loadMoreRef,
    filters,
    setFilters,
    isInitialLoading,
    isFiltering,
    isFetchingNextPage,
    isRetrying,
    error,
    genreError,
    handleRetry,
  } = useSeriesSection();

  if (isInitialLoading) {
    return <MediaSectionSkeleton filters />;
  }

  if (error || genreError) {
    return (
      <MediaErrorState
        message="Could not load TV shows."
        onRetry={handleRetry}
        isRetrying={isRetrying}
      />
    );
  }

  return (
    <section aria-labelledby={id} className="space-y-4 md:space-y-6 mb-16">
      <div className="flex flex-col gap-6 pr-8 sm:flex-row justify-between">
        <h2
          id={id}
          className="text-xl font-normal md:text-[2rem] md:leading-tight">
          {title}
        </h2>

        <MediaFilter
          genres={genres}
          filters={filters}
          sortOptions={tvSortOptions}
          onFiltersChange={setFilters}
        />
      </div>

      {isFiltering ? (
        <MediaGridSkeleton />
      ) : series.length === 0 ? (
        <p className="text-sm text-talora-white">
          No tv shows found for this filter.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-3 md:gap-x-7 md:gap-y-6 xl:pr-8 xl:grid-cols-[repeat(auto-fill,minmax(17.5rem,1fr))] xl:gap-x-10 xl:gap-y-8">
          {series.map((tvShow) => (
            <SeriesCard key={`${tvShow.name}-${tvShow.id}`} tvShow={tvShow} />
          ))}
        </div>
      )}

      <div ref={loadMoreRef} aria-hidden="true" className="h-10" />

      {isFetchingNextPage ? <MediaGridSkeleton count={10} /> : null}
    </section>
  );
}
