interface DeleteReviewModalProps {
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteReviewModal({
  isDeleting,
  onClose,
  onConfirm,
}: DeleteReviewModalProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-review-title"
      className="fixed inset-0 z-50 grid place-items-center bg-talora-dark-blue/80 px-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-talora-semi-dark-blue p-6 text-talora-white shadow-2xl">
        <h2 id="delete-review-title" className="text-xl font-medium">
          Delete review?
        </h2>
        <p className="mt-2 text-sm text-talora-white/70">
          Are you sure you want to delete your review? This action cannot be
          undone.
        </p>
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="inline-flex min-h-10 items-center rounded-lg bg-talora-white/10 px-5 text-sm font-medium text-talora-  
  white cursor-pointer transition hover:bg-talora-white/15 disabled:cursor-not-allowed">
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="inline-flex min-h-10 items-center rounded-lg bg-talora-red px-5 text-sm font-medium text-talora-white  
  cursor-pointer transition hover:bg-talora-red/85 disabled:cursor-not-allowed">
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
