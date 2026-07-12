"use client";

import { useTopRated } from "@/features/top-rated/hooks/use-top-rated";
import { MediaSectionSkeleton } from "./media-skeletons";
import MovieCard from "../movie/movie-card";
import MediaErrorState from "./media-error-state";

interface TopRatedProps {
  title: string;
  id: string;
}

export default function TopRatedSection({ title, id }: TopRatedProps) {
  const { data, isLoading, error, refetch, isFetching } = useTopRated();

  if (isLoading) {
    return <MediaSectionSkeleton />;
  }

  if (error) {
    return (
      <MediaErrorState
        message="Could not load top rated content."
        onRetry={() => void refetch()}
        isRetrying={isFetching}
      />
    );
  }

  const topRated = data?.results ?? [];

  if (topRated.length === 0) return null;

  return (
    <section aria-labelledby={id} className="space-y-4 md:space-y-6 mb-16">
      <h2
        id={id}
        className="text-xl font-normal md:text-[2rem] md:leading-tight">
        {title}
      </h2>

      <div className="grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-3 md:gap-x-7 md:gap-y-6 xl:pr-8 xl:grid-cols-[repeat(auto-fill,minmax(17.5rem,1fr))] xl:gap-x-10 xl:gap-y-8">
        {topRated.map((movie) => (
          <MovieCard key={`${movie.id}`} movie={movie} />
        ))}
      </div>
    </section>
  );
}
