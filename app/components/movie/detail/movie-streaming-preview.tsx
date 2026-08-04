import { getTranslations } from "next-intl/server";

import StreamingPreview from "@/app/components/media/streaming/streaming-preview";
import type { TmdbMovieDetail } from "@/features/movie/types/movie-detail";
import { getTmdbImageUrl } from "@/lib/tmdb/tmdb-image";

interface MovieStreamingPreviewProps {
  movie: TmdbMovieDetail;
}

export default async function MovieStreamingPreview({
  movie,
}: MovieStreamingPreviewProps) {
  const t = await getTranslations("detail");

  const imagePath = movie.backdrop_path ?? movie.poster_path;
  const imageUrl = imagePath ? getTmdbImageUrl(imagePath, "w780") : null;

  return (
    <StreamingPreview
      title={movie.title}
      image={imageUrl}
      heading={t("streamMovie")}
      playLabel={t("playPreviewPlaceholder", { title: movie.title })}
      description={t("streamingDescription")}
    />
  );
}
