import { useQuery } from "@tanstack/react-query";
import { getSeriesGenres } from "../api/get-series-genres";

export function useSeriesGenres() {
  return useQuery({
    queryKey: ["tv-genres"],
    queryFn: getSeriesGenres,
    staleTime: 1000 * 60 * 60 * 24,
  });
}
