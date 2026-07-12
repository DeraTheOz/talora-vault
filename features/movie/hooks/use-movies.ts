import { useInfiniteQuery } from "@tanstack/react-query";
import { getMovies } from "../api/get-movies";
import { MovieFilters } from "@/features/media/types/media";

export function useMovies(filters: MovieFilters = {}) {
  return useInfiniteQuery({
    queryKey: ["movies", filters],
    queryFn: ({ pageParam }) => getMovies(pageParam, filters),
    initialPageParam: 1,
    placeholderData: (previousData) => previousData,
    getNextPageParam: (lastPage) => {
      if (!lastPage.page || !lastPage.total_pages) return undefined;

      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    staleTime: 1000 * 60 * 5,
  });
}
