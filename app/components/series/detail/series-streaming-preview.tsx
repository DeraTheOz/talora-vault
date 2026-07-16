import StreamingPreview from "@/app/components/media/streaming/streaming-preview";
import type { TmdbTvDetail } from "@/features/series/types/series-detail";
import { getTmdbImageUrl } from "@/lib/tmdb/tmdb-image";

interface SeriesStreamingPreviewProps {
  series: TmdbTvDetail;
}

export default function SeriesStreamingPreview({
  series,
}: SeriesStreamingPreviewProps) {
  const imagePath = series.backdrop_path ?? series.poster_path;
  const imageUrl = imagePath ? getTmdbImageUrl(imagePath, "w780") : null;

  return (
    <StreamingPreview
      title={series.name}
      image={imageUrl}
      heading="Stream Episode"
      playLabel={`Play ${series.name} episode preview placeholder`}
      description="Streaming integration coming soon. Check back for legal streaming options and direct playback."
    />
  );
}
