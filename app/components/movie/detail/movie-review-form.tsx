import { getTranslations } from "next-intl/server";

import ReviewForm from "@/app/components/forms/review-form";

export default async function MovieReviewForm({ tmdbId }: { tmdbId: number }) {
  const t = await getTranslations("detail");

  return (
    <ReviewForm
      tmdbId={tmdbId}
      mediaType="movie"
      reviewPlaceholder={t("movieReviewPlaceholder")}
    />
  );
}
