"use client";

import { useEffect } from "react";

import { useWatchProgressStore } from "@/stores/watch-progress/watch-progress-store";
import {
  getAllWatchProgress,
  upsertWatchProgress,
} from "@/features/watch-progress/actions/watch-progress-actions";

const FLUSH_INTERVAL_MS = 5000;

export function useWatchProgressSync(isSignedIn: boolean) {
  const hydrateFromServer = useWatchProgressStore(
    (s) => s.hydrateFromServer,
  );

  useEffect(() => {
    if (!isSignedIn) return;

    let cancelled = false;

    async function hydrate() {
      const entries = await getAllWatchProgress();
      if (!cancelled) {
        hydrateFromServer(entries);
      }
    }

    void hydrate();

    return () => {
      cancelled = true;
    };
  }, [isSignedIn, hydrateFromServer]);

  useEffect(() => {
    if (!isSignedIn) return;

    const intervalId = setInterval(async () => {
      const store = useWatchProgressStore.getState();
      if (store.pendingWrites.length === 0) return;

      const writes = store.flushPendingWrites();

      for (const write of writes) {
        await upsertWatchProgress({
          tmdbId: write.tmdbId,
          mediaType: write.mediaType,
          season: write.season,
          episode: write.episode,
          currentTime: write.currentTime,
          duration: write.duration,
          percentage: write.percentage,
          title: write.title,
          posterPath: write.posterPath,
          releaseDate: write.releaseDate,
          completed: write.completed,
        });
      }
    }, FLUSH_INTERVAL_MS);

    return () => {
      clearInterval(intervalId);

      const store = useWatchProgressStore.getState();
      const remaining = store.flushPendingWrites();

      if (remaining.length > 0) {
        void Promise.all(
          remaining.map((write) =>
            upsertWatchProgress({
              tmdbId: write.tmdbId,
              mediaType: write.mediaType,
              season: write.season,
              episode: write.episode,
              currentTime: write.currentTime,
              duration: write.duration,
              percentage: write.percentage,
              title: write.title,
              posterPath: write.posterPath,
              releaseDate: write.releaseDate,
              completed: write.completed,
            }),
          ),
        );
      }
    };
  }, [isSignedIn]);
}
