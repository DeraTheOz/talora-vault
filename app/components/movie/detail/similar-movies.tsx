"use client";

import { useSimilarMovies } from "@/features/movie/hooks/use-similar-movies";
import SimilarMedia from "@/app/components/media/similar/similar-media";
import { SimilarMediaSkeleton } from "../../media/media-skeletons";
import { toSimilarMediaCardItem } from "@/features/media/similar/to-similar-media-card-item";

export default function SimilarMovies({ id }: { id: string }) {
  const { data, isLoading, error } = useSimilarMovies(id);

  if (isLoading) return <SimilarMediaSkeleton />;
  if (error || !data?.results?.length) return null;

  const items = data.results.map((movie) =>
    toSimilarMediaCardItem(movie, "movie"),
  );

  return (
    <SimilarMedia
      title="You May Also Like"
      titleId="similar-movies-title"
      items={items}
    />
  );
}
