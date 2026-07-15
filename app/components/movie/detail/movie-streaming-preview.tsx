import StreamingPreview from "@/app/components/media/streaming/streaming-preview";
import type { TmdbMovieDetail } from "@/features/movie/types/movie-detail";
import { getTmdbImageUrl } from "@/lib/tmdb/tmdb-image";

interface MovieStreamingPreviewProps {
  movie: TmdbMovieDetail;
}

export default function MovieStreamingPreview({
  movie,
}: MovieStreamingPreviewProps) {
  const imagePath = movie.backdrop_path ?? movie.poster_path;
  const imageUrl = imagePath ? getTmdbImageUrl(imagePath, "w780") : null;

  return (
    <StreamingPreview
      title={movie.title}
      image={imageUrl}
      heading="Stream Movie"
      playLabel={`Play ${movie.title} preview placeholder`}
      description="Streaming integration coming soon. Check back for legal streaming options and direct playback."
    />
  );
}
