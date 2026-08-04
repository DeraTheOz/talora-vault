"use client";

import { useTranslations } from "next-intl";
import { useNowPlaying } from "@/features/now-playing/hooks/use-now-playing";
import MediaCard from "./card/media-card";
import { MediaSectionSkeleton } from "./media-skeletons";
import MediaErrorState from "./media-error-state";

interface NowPlayingProps {
  id: string;
}

export default function NowPlayingSection({ id }: NowPlayingProps) {
  const t = useTranslations("home");
  const {
    data: nowPlaying = [],
    isLoading,
    error,
    refetch,
    isFetching,
  } = useNowPlaying();

  if (isLoading) {
    return <MediaSectionSkeleton />;
  }

  if (error) {
    return (
      <MediaErrorState
        message={t("nowPlayingError")}
        onRetry={() => void refetch()}
        isRetrying={isFetching}
      />
    );
  }

  return (
    <section aria-labelledby={id} className="space-y-4 md:space-y-6 mb-16">
      <h2
        id={id}
        className="text-2xl font-normal md:text-[2rem] md:leading-tight">
        {t("nowPlaying")}
      </h2>

      <div className="grid max-[369px]:grid-cols-1 grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-3 md:gap-x-7 md:gap-y-6 xl:pr-8 xl:grid-cols-[repeat(auto-fill,minmax(17.5rem,1fr))] xl:gap-x-10 xl:gap-y-8">
        {nowPlaying.map((media) => (
          <MediaCard key={`${media.media_type}-${media.id}`} media={media} />
        ))}
      </div>
    </section>
  );
}
