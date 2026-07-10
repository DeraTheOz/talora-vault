import { useQuery } from "@tanstack/react-query";
import { getMovieGenres } from "../api/get-movie-genres";

export function useMovieGenres() {
  return useQuery({
    queryKey: ["movie-genres"],
    queryFn: getMovieGenres,
    staleTime: 1000 * 60 * 60 * 24,
  });
}
