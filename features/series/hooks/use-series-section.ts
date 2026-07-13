"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";

import { useSeries } from "./use-series";
import { useSeriesGenres } from "./use-series-genre";
import { useTvFilterStore } from "@/stores/series/series-filter-store";
import { toastStyles } from "@/lib/constants/toast";

export function useSeriesSection() {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const filters = useTvFilterStore((state) => state.filters);
  const setFilters = useTvFilterStore((state) => state.setFilters);

  const {
    data,
    isLoading,
    isFetching,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchSeries,
  } = useSeries(filters);

  const {
    data: genreData,
    isLoading: isLoadingGenres,
    error: genreError,
    refetch: refetchSeriesGenres,
  } = useSeriesGenres();

  const series = Array.from(
    new Map(
      data?.pages
        .flatMap((page) => page.results)
        .map((series) => [series.id, series]),
    ).values(),
  );

  useEffect(() => {
    if (!error) return;

    toast.error("Could not load TV shows", {
      id: "series-load-error",
      description: "Please try again or change your filters.",
      ...toastStyles.error,
    });
  }, [error]);

  useEffect(() => {
    if (!genreError) return;

    toast.error("Could not load TV show genres", {
      id: "series-genres-load-error",
      description:
        "The series list may still work, but filters are unavailable.",
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
    if (error) void refetchSeries();
    if (genreError) void refetchSeriesGenres();
  }

  return {
    series,
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
