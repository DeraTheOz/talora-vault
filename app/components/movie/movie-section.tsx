"use client";

import {
  MediaGridSkeleton,
  MediaSectionSkeleton,
} from "../media/media-skeletons";

import MovieCard from "./movie-card";
import MediaFilter from "../media/filter/media-filter";
import MediaErrorState from "../media/media-error-state";

import { useMovieSection } from "@/features/movie/hooks/use-movie-section";
import { movieSortOptions } from "@/lib/constants/sort-options";

interface MovieProps {
  title: string;
  id: string;
}

export default function MovieSection({ title, id }: MovieProps) {
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
        message="Could not load movies."
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
          sortOptions={movieSortOptions}
          onFiltersChange={setFilters}
        />
      </div>

      {isFiltering ? (
        <MediaGridSkeleton />
      ) : movies.length === 0 ? (
        <p className="text-sm text-talora-white">
          No movies found for this filter.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-3 md:gap-x-7 md:gap-y-6 xl:pr-8 xl:grid-cols-[repeat(auto-fill,minmax(17.5rem,1fr))] xl:gap-x-10 xl:gap-y-8">
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
