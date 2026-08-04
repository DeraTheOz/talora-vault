"use client";

import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { Controller } from "react-hook-form";
import { useTranslations } from "next-intl";

import { MediaType } from "@/features/media/types/media";
import { useReview } from "@/features/reviews/hooks/use-review";
import ReviewCard from "../media/review/review-card";
import CustomSelect from "./custom-select";
import FormError from "./form-error";
import LoginAuthModal from "../modals/login-auth-modal";
import DeleteReviewModal from "../modals/delete-review-modal";
import { createRatingOptions } from "@/lib/constants/rating-options";

/** Database review row shape (returned by server actions). */
export interface Review {
  id: string;
  userId: string;
  tmdbId: number;
  mediaType: MediaType;
  rating: number;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface ReviewFormProps {
  tmdbId: number;
  mediaType: MediaType;
  submitLabel?: string;
  reviewPlaceholder?: string;
}

export default function ReviewForm({
  tmdbId,
  mediaType,
  submitLabel,
  reviewPlaceholder,
}: ReviewFormProps) {
  const pathname = usePathname();
  const t = useTranslations("detail");
  const commonT = useTranslations("common");
  const {
    form,
    review,
    isLocked,
    showAuthModal,
    setShowAuthModal,
    showDeleteModal,
    setShowDeleteModal,
    handleFormSubmit,
    handleEdit,
    handleCancel,
    openDeleteModal,
    isDeleting,
    handleConfirmDelete,
  } = useReview(tmdbId, mediaType);

  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = form;

  const ratingOptions = createRatingOptions(t);

  return (
    <section aria-labelledby="review-title" className="space-y-6">
      {/* Saved Review Card */}
      {review && (
        <ReviewCard
          review={review}
          onEdit={handleEdit}
          onDelete={openDeleteModal}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Review Form */}
      <div id="review-form" className="scroll-mt-6">
        <h2 id="review-title" className="mb-4 text-2xl font-normal">
          {t("rateAndReview")}
        </h2>

        <form
          onSubmit={handleFormSubmit}
          className="rounded-lg bg-talora-semi-dark-blue p-4 space-y-1 md:p-6">
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-talora-white">
            {t("yourRating")}
          </label>

          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <CustomSelect
                id="rating"
                name="rating"
                options={ratingOptions}
                value={String(field.value ?? "")}
                onChange={(value) => field.onChange(value)}
                disabled={isLocked || isSubmitting}
                ariaLabel={t("chooseYourRating")}
              />
            )}
          />
          {errors.rating && <FormError errorMessage={errors.rating.message} />}

          <label
            htmlFor="content"
            className="mt-5 block text-sm font-medium text-talora-white">
            {t("leaveAReview")}{" "}
            <span className="text-xs text-talora-white/40 font-normal">
              ({t("optional")})
            </span>
          </label>

          <textarea
            id="content"
            rows={5}
            disabled={isLocked || isSubmitting}
            placeholder={reviewPlaceholder ?? t("movieReviewPlaceholder")}
            {...register("content")}
            className="mt-2 w-full resize-none rounded-lg border border-talora-dark-blue bg-talora-dark-blue px-4 py-3 text-sm text-talora-white outline-none placeholder:text-talora-white/35 focus:border-talora-red"
          />
          {errors.content && (
            <FormError errorMessage={errors.content.message} />
          )}

          {!isLocked && (
            <div className="mt-5 flex items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex min-h-11 items-center rounded-lg bg-talora-red px-5 text-sm font-medium text-talora-white cursor-pointer transition hover:bg-talora-red/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-talora-white active:scale-95 disabled:cursor-not-allowed">
                {isSubmitting ? t("saving") : (submitLabel ?? t("saveReview"))}
              </button>

              {review && review.rating >= 1 && (
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="inline-flex min-h-11 items-center rounded-lg bg-talora-white/10 px-6 text-sm font-medium text-talora-white cursor-pointer transition hover:bg-talora-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-talora-white active:scale-95 disabled:cursor-not-allowed">
                  {commonT("cancel")}
                </button>
              )}
            </div>
          )}
        </form>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteReviewModal
          isDeleting={isDeleting}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* Auth Modal */}
      {showAuthModal
        ? createPortal(
            <LoginAuthModal
              titleId="review-auth-title"
              title={t("loginToRateReviewTitle")}
              description={t("loginToRateReviewDescription")}
              href={`/login?callbackUrl=${encodeURIComponent(pathname)}`}
              onClose={() => setShowAuthModal(false)}
              primaryButtonText={t("login")}
              secondaryButtonText={commonT("cancel")}
            />,
            document.body,
          )
        : null}
    </section>
  );
}
