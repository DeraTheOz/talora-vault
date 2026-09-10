"use client";

import { useMemo } from "react";

import { useWatchProgressStore } from "@/stores/watch-progress/watch-progress-store";
import { buildEmbedUrl } from "./build-embed-url";
import Player from "./player";
import { useTranslations } from "next-intl";

interface MoviePlayerProps {
  tmdbId: number;
  title: string;
  posterPath: string | null;
  releaseDate: string | null;
}

export default function MoviePlayer({
  tmdbId,
  title,
  posterPath,
  releaseDate,
}: MoviePlayerProps) {
  const t = useTranslations("detail");
  const embedUrl = useMemo(() => buildEmbedUrl("movie", tmdbId), [tmdbId]);

  const resumeTime = useMemo(() => {
    const snap = useWatchProgressStore.getState();
    const entry = snap.getMovieProgress(tmdbId);
    if (entry && !entry.completed && entry.currentTime > 0) {
      return entry.currentTime;
    }
    return undefined;
  }, [tmdbId]);

  return (
    <section id="streaming-preview" aria-labelledby="streaming-title">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 id="streaming-title" className="text-2xl font-normal">
          {t("streamMovie")}
        </h2>
      </div>

      <Player
        embedUrl={embedUrl}
        title={title}
        mediaType="movie"
        tmdbId={tmdbId}
        posterPath={posterPath}
        releaseDate={releaseDate}
        resumeTime={resumeTime}
      />
    </section>
  );
}
