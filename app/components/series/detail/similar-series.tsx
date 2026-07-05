import SimilarMedia from "@/app/components/media/similar/similar-media";
import type { SimilarSeries } from "@/app/data/series-detail";

interface SimilarSeriesProps {
  series: SimilarSeries[];
}

export default function SimilarSeriesList({ series }: SimilarSeriesProps) {
  return (
    <SimilarMedia
      title="Similar Series"
      titleId="similar-series-title"
      items={series}
      hrefBase="/series"
      mediaLabel="TV Series"
    />
  );
}
