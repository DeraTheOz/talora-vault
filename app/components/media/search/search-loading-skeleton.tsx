import Skeleton from "@/app/components/ui/skeleton";

export default function SearchLoadingSkeleton() {
  return (
    <div
      className="p-3 space-y-2"
      role="status"
      aria-label="Loading search results">
      {/* Render 4 skeleton rows to match typical result count */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 rounded-lg px-3 py-2">
          {/* Poster thumbnail skeleton */}
          <Skeleton className="h-12 w-8 shrink-0 rounded" />

          {/* Text skeleton lines */}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-3 w-full rounded" />
          </div>
        </div>
      ))}

      <span className="sr-only">Loading...</span>
    </div>
  );
}
