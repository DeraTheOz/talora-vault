"use client";

import { useTranslations } from "next-intl";

import {
  MediaGridSkeleton,
  MediaSectionSkeleton,
} from "../media/media-skeletons";

import MovieCard from "./movie-card";
import MediaFilter from "../media/filter/media-filter";
import MediaErrorState from "../media/media-error-state";

import { useMovieSection } from "@/features/movie/hooks/use-movie-section";
import {
  movieSortOptions,
  toFilterSelectOptions,
} from "@/lib/constants/sort-options";

interface MovieProps {
  id: string;
}

export default function MovieSection({ id }: MovieProps) {
  const t = useTranslations("browse");
  const {
    movies,
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
  } = useMovieSection();

  if (isInitialLoading) {
    return <MediaSectionSkeleton filters />;
  }

  if (error || genreError) {
    return (
      <MediaErrorState
        message={t("moviesError")}
        onRetry={handleRetry}
        isRetrying={isRetrying}
      />
    );
  }

  return (
    <section aria-labelledby={id} className="space-y-8 mb-16">
      <div className="flex flex-col gap-6 justify-between sm:flex-row xl:pr-8">
        <h2
          id={id}
          className="text-2xl font-normal md:text-[2rem] md:leading-tight">
          {t("movies")}
        </h2>

        <MediaFilter
          genres={genres}
          filters={filters}
          sortOptions={toFilterSelectOptions(movieSortOptions, (key) =>
            t(key),
          )}
          onFiltersChange={setFilters}
        />
      </div>

      {isFiltering ? (
        <MediaGridSkeleton />
      ) : movies.length === 0 ? (
        <p className="text-sm text-talora-white">
          {t("noMoviesForFilter")}
        </p>
      ) : (
        <div className="grid max-[369px]:grid-cols-1 grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-3 md:gap-x-7 md:gap-y-6 xl:pr-8 xl:grid-cols-[repeat(auto-fill,minmax(17.5rem,1fr))] xl:gap-x-10 xl:gap-y-8">
          {movies.map((movie) => (
            <MovieCard key={`${movie.title}-${movie.id}`} movie={movie} />
          ))}
        </div>
      )}

      <div ref={loadMoreRef} aria-hidden="true" className="h-10" />

      {isFetchingNextPage ? <MediaGridSkeleton count={10} /> : null}
    </section>
  );
}
