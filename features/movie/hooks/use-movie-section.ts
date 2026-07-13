"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";

import { useMovies } from "./use-movies";
import { useMovieGenres } from "./use-movie-genres";
import { useMovieFilterStore } from "@/stores/movie/movie-filter-store";
import { toastStyles } from "@/lib/constants/toast";

export function useMovieSection() {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const filters = useMovieFilterStore((state) => state.filters);
  const setFilters = useMovieFilterStore((state) => state.setFilters);

  const {
    data,
    isLoading,
    isFetching,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchMovies,
  } = useMovies(filters);

  const {
    data: genreData,
    isLoading: isLoadingGenres,
    error: genreError,
    refetch: refetchMovieGenres,
  } = useMovieGenres();

  const movies = Array.from(
    new Map(
      data?.pages
        .flatMap((page) => page.results)
        .map((movie) => [movie.id, movie]),
    ).values(),
  );

  useEffect(() => {
    if (!error) return;

    toast.error("Could not load movies", {
      id: "movies-load-error",
      description: "Please try again or change your filters.",
      ...toastStyles.error,
    });
  }, [error]);

  useEffect(() => {
    if (!genreError) return;

    toast.error("Could not load movie genres", {
      id: "movie-genres-load-error",
      description:
        "The movie list may still work, but filters are unavailable.",
      ...toastStyles.error,
    });
  }, [genreError]);

  useEffect(() => {
    const loadMoreElement = loadMoreRef.current;

    if (!loadMoreElement || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "400px",
        threshold: 0,
      },
    );

    observer.observe(loadMoreElement);

    return () => {
      observer.unobserve(loadMoreElement);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const hasMovieData = Boolean(data?.pages.length);
  const isInitialLoading = isLoadingGenres || (isLoading && !hasMovieData);
  const isFiltering = isFetching && !isFetchingNextPage;
  const isRetrying = isFetching || isLoadingGenres;

  function handleRetry() {
    if (error) void refetchMovies();
    if (genreError) void refetchMovieGenres();
  }

  return {
    movies,
    genres: genreData?.genres ?? [],
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
  };
}
