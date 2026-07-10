import { useQuery } from "@tanstack/react-query";
import { getTopRated } from "../api/get-top-rated";

export function useTopRated() {
  return useQuery({
    queryKey: ["top-rated"],
    queryFn: getTopRated,
    staleTime: 1000 * 60 * 50,
  });
}
