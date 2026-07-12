"use client";

import { useNowPlaying } from "@/features/now-playing/hooks/use-now-playing";
import MediaCard from "./card/media-card";
import { MediaSectionSkeleton } from "./media-skeletons";
import MediaErrorState from "./media-error-state";

interface MediaProps {
  title: string;
  id: string;
}

export default function MediaSection({ title, id }: MediaProps) {
  const { data: nowPlaying = [], isLoading, error } = useNowPlaying();

  if (isLoading) {
    return <MediaSectionSkeleton />;
  }

  if (error) {
    return <MediaErrorState message="Could not load now playing content." />;
  }

  return (
    <section aria-labelledby={id} className="space-y-4 md:space-y-6 mb-16">
      <h2
        id={id}
        className="text-xl font-normal md:text-[2rem] md:leading-tight">
        {title}
      </h2>

      <div className="grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-3 md:gap-x-7 md:gap-y-6 xl:pr-8 xl:grid-cols-[repeat(auto-fill,minmax(17.5rem,1fr))] xl:gap-x-10 xl:gap-y-8">
        {nowPlaying.map((media) => (
          <MediaCard key={`${media.media_type}-${media.id}`} media={media} />
        ))}
      </div>
    </section>
  );
}
