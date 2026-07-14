import Skeleton from "@/app/components/ui/skeleton";

export function SearchSkeleton() {
  return (
    <div className="flex min-h-12 items-center gap-4 pr-6 md:gap-6">
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
    <div className="grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-3 md:gap-x-7 md:gap-y-6 xl:pr-8 xl:grid-cols-[repeat(auto-fill,minmax(17.5rem,1fr))] xl:gap-x-10 xl:gap-y-8">
      {Array.from({ length: count }).map((_, index) => (
        <MediaCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function MediaSectionSkeleton({
  title = true,
  filters = false,
}: {
  title?: boolean;
  filters?: boolean;
}) {
  return (
    <section className="space-y-4 md:space-y-6 mb-16">
      {title || filters ? (
        <div className="flex flex-col gap-6 pr-8 sm:flex-row sm:justify-between">
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

export function TrendingSectionSkeleton() {
  return (
    <section className="min-w-0 overflow-hidden space-y-4 md:space-y-6">
      <Skeleton className="h-8 w-36 md:h-10" />

      <div className="-mx-4 flex gap-4 overflow-hidden px-4 pb-2 md:mx-0 md:gap-10 xl:px-0 xl:pr-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-45 w-60 shrink-0 md:h-57.5 md:w-117.5"
          />
        ))}
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
