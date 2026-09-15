import Skeleton from "@/app/components/ui/skeleton";

export function SearchSkeleton() {
  return (
    <div className="flex min-h-12 items-center gap-4 md:gap-6 px-4 sm:px-6 xl:px-8">
      <Skeleton className="size-8 rounded-full" />
      <Skeleton className="h-7 w-full max-w-2xl" />
    </div>
  );
}

export function MediaCardSkeleton() {
  return (
    <article className="w-full">
      <Skeleton className="aspect-164/110 md:aspect-220/140 xl:aspect-auto xl:h-44.5" />
      <div className="mt-3 space-y-2">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-5 w-4/5" />
      </div>
    </article>
  );
}

export function MediaGridSkeleton({ count = 15 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-3 md:gap-x-7 md:gap-y-6 xl:grid-cols-[repeat(auto-fill,minmax(17.5rem,1fr))] xl:gap-x-10 xl:gap-y-8">
      {Array.from({ length: count }).map((_, index) => (
        <MediaCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function MediaSkeleton({
  title = true,
  filters = false,
}: {
  title?: boolean;
  filters?: boolean;
}) {
  return (
    <section className="space-y-4 md:space-y-6 mb-16 px-4 sm:px-6 xl:px-8">
      {title || filters ? (
        <div className="flex flex-col gap-6 justify-between sm:flex-row">
          {title ? <Skeleton className="h-8 w-44 md:h-10" /> : null}

          {filters ? (
            <div className="flex flex-row gap-3 md:flex-row md:items-center">
              <Skeleton className="h-11 w-full sm:w-44" />
              <Skeleton className="h-11 w-full sm:w-44" />
            </div>
          ) : null}
        </div>
      ) : null}

      <MediaGridSkeleton />
    </section>
  );
}

export function TrendingSkeleton() {
  return (
    <section
      className="relative overflow-x-clip px-4 py-16 md:py-20"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}>
      <div className="relative mx-auto aspect-2/3 w-[min(70vw,16rem)] sm:w-64 md:w-72 lg:w-80">
        <Skeleton className="absolute inset-0 rounded-lg" />
      </div>

      <div className="mx-auto mt-8 flex max-w-2xl items-end justify-between gap-8 px-1">
        <div className="space-y-3">
          <Skeleton className="h-3 w-44" />
          <Skeleton className="h-6 w-56" />
        </div>
        <Skeleton className="h-4 w-20" />
      </div>

      <div className="mx-auto mt-10 flex max-w-2xl items-center gap-5 px-1">
        <Skeleton className="size-10 shrink-0 rounded-full" />
        <div className="relative flex-1 py-3">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/15" />
          <div className="absolute left-0 top-1/2 size-2 -translate-y-1/2 rounded-full bg-white/25" />
        </div>
        <Skeleton className="size-10 shrink-0 rounded-full" />
      </div>
    </section>
  );
}

export function CastSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-32" />
      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-18 w-52 shrink-0 rounded-md" />
        ))}
      </div>
    </div>
  );
}

export function SimilarMediaSkeleton() {
  return (
    <div>
      <Skeleton className="mb-4 h-8 w-40" />
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="aspect-164/110 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
