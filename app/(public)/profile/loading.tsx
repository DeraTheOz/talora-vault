import Skeleton from "@/app/components/ui/skeleton";

export default function ProfileLoading() {
  return (
    <div className="space-y-6 pb-6 md:space-y-8 pl-1.5 xl:pr-8">
      {/* Header skeleton */}
      <section
        aria-label="Loading profile information"
        className="rounded-xl bg-talora-semi-dark-blue p-5 md:p-8">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:gap-8">
          <Skeleton className="size-20 shrink-0 rounded-xl md:size-28" />
          <div className="min-w-0 flex-1 space-y-3">
            <Skeleton className="h-8 w-48 md:h-10" />
            <Skeleton className="h-4 w-72" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Skeleton className="h-11 w-32 shrink-0 rounded-lg" />
            <Skeleton className="h-11 w-32 shrink-0 rounded-lg" />
          </div>
        </div>
      </section>

      {/* Stats skeleton */}
      <section
        aria-label="Loading statistics"
        className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-xl bg-talora-semi-dark-blue p-4 md:p-5">
            <Skeleton className="size-10 shrink-0 rounded-lg" />
            <div className="min-w-0 space-y-1.5">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        ))}
      </section>

      {/* Activity skeleton */}
      <section aria-label="Loading activity" className="space-y-4">
        <Skeleton className="h-8 w-44 md:h-10" />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <Skeleton className="h-4 w-48" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl bg-talora-semi-dark-blue p-3">
                <Skeleton className="size-14 shrink-0 rounded-lg md:size-16" />
                <div className="min-w-0 space-y-1.5">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-32" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="space-y-2 rounded-xl bg-talora-semi-dark-blue p-4 md:p-5">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delete account skeleton */}
      <section
        aria-label="Loading delete account"
        className="rounded-xl bg-talora-semi-dark-blue p-5 md:p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-64" />
          </div>
          <Skeleton className="h-11 w-24 shrink-0 rounded-lg" />
        </div>
      </section>
    </div>
  );
}
