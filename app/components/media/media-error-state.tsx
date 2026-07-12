"use client";

interface MediaErrorStateProps {
  message: string;
  onRetry?: () => void;
  isRetrying?: boolean;
  retryLabel?: string;
}

export default function MediaErrorState({
  message,
  onRetry,
  isRetrying = false,
  retryLabel = "Retry",
}: MediaErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-3 text-talora-white">
      <p className="text-talora-red">{message}</p>

      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          disabled={isRetrying}
          className="rounded-md bg-talora-red px-4 py-2 text-sm font-medium transition cursor-pointer hover:bg-talora-red/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-talora-white disabled:cursor-not-allowed disabled:opacity-60">
          {isRetrying ? "Retrying..." : retryLabel}
        </button>
      ) : null}
    </div>
  );
}
