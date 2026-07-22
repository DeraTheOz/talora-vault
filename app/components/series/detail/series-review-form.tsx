import ReviewForm from "@/app/components/forms/review-form";

export default function SeriesReviewForm({ tmdbId }: { tmdbId: number }) {
  return (
    <ReviewForm
      tmdbId={tmdbId}
      mediaType="tv"
      reviewPlaceholder="Share your thoughts on this series..."
    />
  );
}
