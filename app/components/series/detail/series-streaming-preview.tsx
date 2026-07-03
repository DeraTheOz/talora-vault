import MediaStreamingPreview from "@/app/components/media/streaming/streaming-preview";
import type { SeriesDetail } from "@/app/data/series-detail";

interface SeriesStreamingPreviewProps {
  series: SeriesDetail;
}

export default function SeriesStreamingPreview({
  series,
}: SeriesStreamingPreviewProps) {
  return (
    <MediaStreamingPreview
      title={series.title}
      image={series.image}
      heading="Stream Episode"
      playLabel={`Play ${series.title} episode preview placeholder`}
      description="Selected episode provider embed or legal redirect module will mount here during streaming integration."
    />
  );
}
