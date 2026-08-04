import { getTranslations } from "next-intl/server";

import StreamingPreview from "@/app/components/media/streaming/streaming-preview";
import type { TmdbTvDetail } from "@/features/series/types/series-detail";
import { getTmdbImageUrl } from "@/lib/tmdb/tmdb-image";

interface SeriesStreamingPreviewProps {
  series: TmdbTvDetail;
}

export default async function SeriesStreamingPreview({
  series,
}: SeriesStreamingPreviewProps) {
  const t = await getTranslations("detail");

  const imagePath = series.backdrop_path ?? series.poster_path;
  const imageUrl = imagePath ? getTmdbImageUrl(imagePath, "w780") : null;

  return (
    <StreamingPreview
      title={series.name}
      image={imageUrl}
      heading={t("streamEpisode")}
      playLabel={t("playPreviewPlaceholder", { title: series.name })}
      description={t("streamingDescription")}
    />
  );
}
