"use client";

import SimilarMedia from "@/app/components/media/similar/similar-media";
import { SimilarMediaSkeleton } from "../../media/media-skeletons";
import { toSimilarMediaCardItem } from "@/features/media/similar/to-similar-media-card-item";
import { useSimilarTvShows } from "@/features/series/hooks/use-similar-series";

export default function SimilarTvShows({ id }: { id: string }) {
  const { data, isLoading, error } = useSimilarTvShows(id);

  if (isLoading) return <SimilarMediaSkeleton />;
  if (error || !data?.results?.length) return null;

  const items = data.results.map((tvShow) =>
    toSimilarMediaCardItem(tvShow, "tv"),
  );

  return (
    <SimilarMedia
      title="You May Also Like"
      titleId="similar-tv-title"
      items={items}
    />
  );
}
