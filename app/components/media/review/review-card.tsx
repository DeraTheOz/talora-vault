import { HugeiconsIcon } from "@hugeicons/react";
import { Delete02Icon, Edit02Icon, StarIcon } from "@hugeicons/core-free-icons";
import { formatDate } from "@/lib/helpers/format";
import type { Review } from "../../forms/review-form";

interface ReviewCardProps {
  review: Review;
  onEdit: () => void;
  onDelete: () => void;
  isSubmitting: boolean;
}

export default function ReviewCard({
  review,
  onEdit,
  onDelete,
  isSubmitting,
}: ReviewCardProps) {
  const isUpdated =
    new Date(review.updatedAt).getTime() !==
    new Date(review.createdAt).getTime();

  return (
    <div className="min-w-0 max-w-full rounded-xl bg-talora-semi-dark-blue p-5 backdrop-blur-sm transition-all duration-300">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-talora-red">
            Your Review
          </span>
          <div className="flex items-center gap-1.5 text-lg font-bold text-talora-white">
            <HugeiconsIcon
              icon={StarIcon}
              size={18}
              className="fill-talora-white text-talora-white"
            />
            <span>{review.rating} / 10</span>
          </div>
        </div>

        {/* Edit / Delete Icons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onEdit}
            aria-label="Edit review"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-talora-white/5 text-talora-white/60 cursor-pointer transition hover:bg-talora-white/10 hover:text-talora-white active:scale-95">
            <HugeiconsIcon icon={Edit02Icon} size={18} />
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onDelete}
            aria-label="Delete review"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-talora-white/5 text-talora-white/60 cursor-pointer transition hover:bg-talora-red/10 hover:text-talora-red active:scale-95 disabled:opacity-50">
            <HugeiconsIcon icon={Delete02Icon} size={18} />
          </button>
        </div>
      </div>

      {review.content && (
        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-talora-white/90 wrap-anywhere">
          {review.content}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-talora-white/50">
        <span>Posted: {formatDate(review.createdAt)}</span>
        {isUpdated && <span>• Updated: {formatDate(review.updatedAt)}</span>}
      </div>
    </div>
  );
}
