"use client";

import { useEffect, useRef } from "react";

import type { MediaType } from "@/features/media/types/media";
import { useWatchProgressStore } from "@/stores/watch-progress/watch-progress-store";
import { STREAM_ORIGIN } from "@/lib/constants/stream";

const SAVE_INTERVAL_MS = 5000;

interface UsePlayerParams {
  mediaType?: MediaType;
  tmdbId?: number;
  title?: string;
  posterPath?: string | null;
  releaseDate?: string | null;
  season?: number;
  episode?: number;
  onEpisodeChange?: (season: number, episode: number) => void;
  resumeTime?: number;
  embedUrl: string;
}

interface UsePlayerReturn {
  src: string;
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
}

export function usePlayer({
  mediaType,
  tmdbId,
  title,
  posterPath,
  releaseDate,
  season,
  episode,
  onEpisodeChange,
  resumeTime,
  embedUrl,
}: UsePlayerParams): UsePlayerReturn {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const lastSaveRef = useRef(0);
  const seasonRef = useRef(season);
  const episodeRef = useRef(episode);
  const onEpisodeChangeRef = useRef(onEpisodeChange);
  const progressMeta = useRef({
    title: title ?? "",
    poster_path: posterPath ?? null,
    release_date: releaseDate ?? null,
    media_type: mediaType,
  });

  useEffect(() => {
    seasonRef.current = season;
    episodeRef.current = episode;
  }, [season, episode]);

  useEffect(() => {
    onEpisodeChangeRef.current = onEpisodeChange;
  }, [onEpisodeChange]);

  useEffect(() => {
    progressMeta.current = {
      title: title ?? "",
      poster_path: posterPath ?? null,
      release_date: releaseDate ?? null,
      media_type: mediaType,
    };
  }, [title, posterPath, releaseDate, mediaType]);

  const updateMovieProgress = useWatchProgressStore(
    (s) => s.updateMovieProgress,
  );
  const updateTvProgress = useWatchProgressStore((s) => s.updateTvProgress);
  const markMovieCompleted = useWatchProgressStore((s) => s.markMovieCompleted);
  const markTvCompleted = useWatchProgressStore((s) => s.markTvCompleted);

  useEffect(() => {
    if (!mediaType || !tmdbId) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== STREAM_ORIGIN) return;

      const { type } = event.data;

      if (type === "cinesrc:timeupdate") {
        const { currentTime, duration } = event.data;
        if (typeof currentTime !== "number") return;

        const now = Date.now();
        if (now - lastSaveRef.current < SAVE_INTERVAL_MS) return;
        lastSaveRef.current = now;

        const s = seasonRef.current;
        const e = episodeRef.current;
        const meta = progressMeta.current;

        if (mediaType === "movie") {
          updateMovieProgress(tmdbId, currentTime, duration ?? 0, {
            title: meta.title,
            poster_path: meta.poster_path,
            release_date: meta.release_date,
            media_type: mediaType,
          });
        } else if (s != null && e != null) {
          updateTvProgress(tmdbId, s, e, currentTime, duration ?? 0, {
            title: meta.title,
            poster_path: meta.poster_path,
            release_date: meta.release_date,
            media_type: mediaType,
          });
        }
      }

      if (type === "cinesrc:ended") {
        const s = seasonRef.current;
        const e = episodeRef.current;

        if (mediaType === "movie") {
          markMovieCompleted(tmdbId);
        } else if (s != null && e != null) {
          markTvCompleted(tmdbId, s, e);
        }
      }

      if (type === "cinesrc:nextepisode") {
        const { season: newSeason, episode: newEpisode } = event.data;
        if (typeof newSeason === "number" && typeof newEpisode === "number") {
          seasonRef.current = newSeason;
          episodeRef.current = newEpisode;
          onEpisodeChangeRef.current?.(newSeason, newEpisode);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [
    mediaType,
    tmdbId,
    updateMovieProgress,
    updateTvProgress,
    markMovieCompleted,
    markTvCompleted,
  ]);

  const src =
    resumeTime && resumeTime > 0
      ? `${embedUrl}${embedUrl.includes("?") ? "&" : "?"}t=${Math.floor(resumeTime)}`
      : embedUrl;

  return { src, iframeRef };
}
