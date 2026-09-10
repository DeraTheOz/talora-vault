import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  ContinueWatchingItem,
  EpisodeKey,
  MovieKey,
  ProgressEntry,
  ProgressMetadata,
  WatchProgressState,
} from "@/features/watch-progress/types/watch-progress";

function getMovieKey(tmdbId: number): MovieKey {
  return `movie:${tmdbId}`;
}

function getEpisodeKey(
  tmdbId: number,
  season: number,
  episode: number,
): EpisodeKey {
  return `tv:${tmdbId}:${season}:${episode}`;
}

function createEntry(
  currentTime: number,
  duration: number,
  metadata: ProgressMetadata,
): ProgressEntry {
  const percentage =
    duration > 0 ? Math.round((currentTime / duration) * 100) : 0;
  return {
    currentTime,
    duration,
    percentage,
    lastWatchedAt: Date.now(),
    completed: percentage >= 90,
    title: metadata.title,
    poster_path: metadata.poster_path,
    release_date: metadata.release_date,
    media_type: metadata.media_type,
  };
}

export const useWatchProgressStore = create<WatchProgressState>()(
  devtools(
    (set, get) => ({
      hydrated: false,
      movieProgress: {},
      tvProgress: {},
      pendingWrites: [],

      hydrateFromServer: (entries) => {
        const movieProgress: Record<MovieKey, ProgressEntry> = {};
        const tvProgress: Record<EpisodeKey, ProgressEntry> = {};

        for (const entry of entries) {
          const percentage =
            entry.duration > 0
              ? Math.round((entry.currentTime / entry.duration) * 100)
              : 0;
          const progressEntry: ProgressEntry = {
            currentTime: entry.currentTime,
            duration: entry.duration,
            percentage,
            lastWatchedAt:
              entry.lastWatchedAt instanceof Date
                ? entry.lastWatchedAt.getTime()
                : new Date(entry.lastWatchedAt).getTime(),
            completed: entry.completed,
            title: entry.title,
            poster_path: entry.posterPath,
            release_date: entry.releaseDate,
            media_type: entry.mediaType,
          };

          if (entry.mediaType === "movie") {
            movieProgress[getMovieKey(entry.tmdbId)] = progressEntry;
          } else if (entry.season != null && entry.episode != null) {
            tvProgress[
              getEpisodeKey(entry.tmdbId, entry.season, entry.episode)
            ] = progressEntry;
          }
        }

        set(
          { movieProgress, tvProgress, hydrated: true },
          false,
          "watchProgress/hydrateFromServer",
        );
      },

      updateMovieProgress: (tmdbId, currentTime, duration, metadata) => {
        const key = getMovieKey(tmdbId);
        const existing = get().movieProgress[key];
        if (existing && Math.abs(existing.currentTime - currentTime) < 5) {
          return;
        }

        const entry = createEntry(currentTime, duration, metadata);

        set(
          (state) => ({
            movieProgress: {
              ...state.movieProgress,
              [key]: entry,
            },
            pendingWrites: [
              ...state.pendingWrites.filter(
                (w) => !(w.mediaType === "movie" && w.tmdbId === tmdbId),
              ),
              {
                tmdbId,
                mediaType: "movie",
                currentTime,
                duration,
                percentage: entry.percentage,
                title: metadata.title,
                posterPath: metadata.poster_path,
                releaseDate: metadata.release_date,
                completed: entry.completed,
              },
            ],
          }),
          false,
          "watchProgress/updateMovie",
        );
      },

      updateTvProgress: (
        tmdbId,
        season,
        episode,
        currentTime,
        duration,
        metadata,
      ) => {
        const key = getEpisodeKey(tmdbId, season, episode);
        const existing = get().tvProgress[key];
        if (existing && Math.abs(existing.currentTime - currentTime) < 5) {
          return;
        }

        const entry = createEntry(currentTime, duration, metadata);

        set(
          (state) => ({
            tvProgress: {
              ...state.tvProgress,
              [key]: entry,
            },
            pendingWrites: [
              ...state.pendingWrites.filter(
                (w) =>
                  !(
                    w.mediaType === "tv" &&
                    w.tmdbId === tmdbId &&
                    w.season === season &&
                    w.episode === episode
                  ),
              ),
              {
                tmdbId,
                mediaType: "tv",
                season,
                episode,
                currentTime,
                duration,
                percentage: entry.percentage,
                title: metadata.title,
                posterPath: metadata.poster_path,
                releaseDate: metadata.release_date,
                completed: entry.completed,
              },
            ],
          }),
          false,
          "watchProgress/updateTv",
        );
      },

      getMovieProgress: (tmdbId) => {
        return get().movieProgress[getMovieKey(tmdbId)];
      },

      getTvProgress: (tmdbId, season, episode) => {
        return get().tvProgress[getEpisodeKey(tmdbId, season, episode)];
      },

      markMovieCompleted: (tmdbId) => {
        const key = getMovieKey(tmdbId);
        const existing = get().movieProgress[key];
        if (!existing) return;

        const updated = {
          ...existing,
          percentage: 100,
          completed: true,
          lastWatchedAt: Date.now(),
        };

        set(
          (state) => ({
            movieProgress: {
              ...state.movieProgress,
              [key]: updated,
            },
            pendingWrites: [
              ...state.pendingWrites.filter(
                (w) => !(w.mediaType === "movie" && w.tmdbId === tmdbId),
              ),
              {
                tmdbId,
                mediaType: "movie",
                currentTime: updated.currentTime,
                duration: updated.duration,
                percentage: 100,
                title: updated.title,
                posterPath: updated.poster_path,
                releaseDate: updated.release_date,
                completed: true,
              },
            ],
          }),
          false,
          "watchProgress/markMovieCompleted",
        );
      },

      markTvCompleted: (tmdbId, season, episode) => {
        const key = getEpisodeKey(tmdbId, season, episode);
        const existing = get().tvProgress[key];
        if (!existing) return;

        const updated = {
          ...existing,
          percentage: 100,
          completed: true,
          lastWatchedAt: Date.now(),
        };

        set(
          (state) => ({
            tvProgress: {
              ...state.tvProgress,
              [key]: updated,
            },
            pendingWrites: [
              ...state.pendingWrites.filter(
                (w) =>
                  !(
                    w.mediaType === "tv" &&
                    w.tmdbId === tmdbId &&
                    w.season === season &&
                    w.episode === episode
                  ),
              ),
              {
                tmdbId,
                mediaType: "tv",
                season,
                episode,
                currentTime: updated.currentTime,
                duration: updated.duration,
                percentage: 100,
                title: updated.title,
                posterPath: updated.poster_path,
                releaseDate: updated.release_date,
                completed: true,
              },
            ],
          }),
          false,
          "watchProgress/markTvCompleted",
        );
      },

      getNextTvEpisode: (tmdbId, currentSeason, currentEpisode) => {
        const tvProgress = get().tvProgress;

        const currentKey = getEpisodeKey(tmdbId, currentSeason, currentEpisode);
        const currentEntry = tvProgress[currentKey];
        if (!currentEntry?.completed) return undefined;

        const nextEpisode = currentEpisode + 1;
        const nextKey = getEpisodeKey(tmdbId, currentSeason, nextEpisode);
        const nextEntry = tvProgress[nextKey];

        if (!nextEntry || nextEntry.completed) {
          const nextSeason = currentSeason + 1;
          const seasonStart = getEpisodeKey(tmdbId, nextSeason, 1);
          const seasonEntry = tvProgress[seasonStart];
          if (!seasonEntry) {
            return { season: nextSeason, episode: 1 };
          }
          return undefined;
        }

        return { season: currentSeason, episode: nextEpisode };
      },

      removeMovieProgress: (tmdbId) => {
        const key = getMovieKey(tmdbId);
        set(
          (state) => {
            const { [key]: _, ...rest } = state.movieProgress;
            return {
              movieProgress: rest,
              pendingWrites: state.pendingWrites.filter(
                (w) => !(w.mediaType === "movie" && w.tmdbId === tmdbId),
              ),
            };
          },
          false,
          "watchProgress/removeMovie",
        );
      },

      removeTvProgress: (tmdbId, season, episode) => {
        const key = getEpisodeKey(tmdbId, season, episode);
        set(
          (state) => {
            const { [key]: _, ...rest } = state.tvProgress;
            return {
              tvProgress: rest,
              pendingWrites: state.pendingWrites.filter(
                (w) =>
                  !(
                    w.mediaType === "tv" &&
                    w.tmdbId === tmdbId &&
                    w.season === season &&
                    w.episode === episode
                  ),
              ),
            };
          },
          false,
          "watchProgress/removeTv",
        );
      },

      clearAll: () => {
        set(
          { movieProgress: {}, tvProgress: {}, pendingWrites: [] },
          false,
          "watchProgress/clearAll",
        );
      },

      getContinueWatching: () => {
        const state = get();
        const items: ContinueWatchingItem[] = [];

        for (const [key, entry] of Object.entries(state.movieProgress)) {
          if (entry.completed) continue;
          const tmdbId = Number(key.split(":")[1]);
          items.push({ ...entry, tmdbId });
        }

        for (const [key, entry] of Object.entries(state.tvProgress)) {
          if (entry.completed) continue;
          const parts = key.split(":");
          const tmdbId = Number(parts[1]);
          const season = Number(parts[2]);
          const episode = Number(parts[3]);
          items.push({ ...entry, tmdbId, season, episode });
        }

        items.sort((a, b) => b.lastWatchedAt - a.lastWatchedAt);
        return items;
      },

      flushPendingWrites: () => {
        const writes = get().pendingWrites;
        set({ pendingWrites: [] }, false, "watchProgress/flushPendingWrites");
        return writes;
      },
    }),
    {
      name: "watch-progress-store",
    },
  ),
);
