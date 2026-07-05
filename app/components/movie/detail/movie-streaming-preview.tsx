import StreamingPreview from "@/app/components/media/streaming/streaming-preview";
import type { MovieDetail } from "@/app/data/movie-detail";

interface StreamingPreviewProps {
  movie: MovieDetail;
}

export default function MovieStreamingPreview({
  movie,
}: StreamingPreviewProps) {
  return (
    <StreamingPreview
      title={movie.title}
      image={movie.image}
      heading="Stream Movie"
      playLabel={`Play ${movie.title} preview placeholder`}
      description="Embed or redirect module will mount here during streaming integration."
    />
  );
}
