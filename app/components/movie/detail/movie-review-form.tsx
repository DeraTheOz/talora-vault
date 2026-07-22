import ReviewForm from "@/app/components/forms/review-form";

export default function MovieReviewForm({ tmdbId }: { tmdbId: number }) {
  return (
    <ReviewForm
      tmdbId={tmdbId}
      mediaType="movie"
      reviewPlaceholder="Share what stood out..."
    />
  );
}
