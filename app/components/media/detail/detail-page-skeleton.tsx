import Skeleton from "@/app/components/ui/skeleton";

export default function DetailPageSkeleton({ withEpisodes = false }) {
  return (
    <div className="pb-6 mb-16 sm:mb-0 xl:pr-8">
      <section className="relative overflow-hidden rounded-lg px-4 pb-8 pt-56 md:px-6 md:pt-72 xl:px-8 xl:pt-80">
        <Skeleton className="absolute inset-0 rounded-lg" />

        <div className="relative max-w-4xl space-y-4">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-12 w-4/5 max-w-3xl md:h-16" />
          <Skeleton className="h-5 w-full max-w-2xl" />
          <Skeleton className="h-5 w-3/4 max-w-xl" />

          <div className="flex gap-3 pt-2">
            <Skeleton className="h-12 w-36" />
            <Skeleton className="h-12 w-40" />
          </div>
        </div>
      </section>

      <div className="mt-5 flex flex-wrap gap-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-24 rounded-full" />
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-6 xl:col-start-1 xl:row-start-1">
          {withEpisodes ? <Skeleton className="h-14 w-full" /> : null}
          <Skeleton className="aspect-video w-full" />
        </div>

        <div className="space-y-4 xl:col-start-1 xl:row-start-2">
          <Skeleton className="h-8 w-36" />
          <div className="flex gap-3 overflow-hidden">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-40 w-28 shrink-0" />
            ))}
          </div>
        </div>

        <Skeleton className="h-72 xl:col-start-1 xl:row-start-3" />

        <div className="xl:col-start-2 xl:row-span-3 xl:row-start-1">
          <Skeleton className="mb-4 h-8 w-40" />
          <div className="grid grid-cols-2 gap-4 xl:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="aspect-2/3" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
