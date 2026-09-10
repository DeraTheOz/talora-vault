import { MediaType } from "@/features/media/types/media";

export type MovieKey = `${MediaType}:${number}`;
export type EpisodeKey = `tv:${number}:${number}:${number}`;

export type ProgressMetadata = {
  title: string;
  poster_path: string | null;
  release_date: string | null;
  media_type: MediaType;
};

export type ProgressEntry = {
  currentTime: number;
  duration: number;
  percentage: number;
  lastWatchedAt: number;
  completed: boolean;
  title: string;
  poster_path: string | null;
  release_date: string | null;
  media_type: MediaType;
};

export type ContinueWatchingItem = ProgressEntry & {
  tmdbId: number;
  season?: number;
  episode?: number;
};

export type PendingWrite = {
  tmdbId: number;
  mediaType: MediaType;
  season?: number;
  episode?: number;
  currentTime: number;
  duration: number;
  percentage: number;
  title: string;
  posterPath: string | null;
  releaseDate: string | null;
  completed: boolean;
};

export type WatchProgressState = {
  hydrated: boolean;
  movieProgress: Record<MovieKey, ProgressEntry>;
  tvProgress: Record<EpisodeKey, ProgressEntry>;
  pendingWrites: PendingWrite[];
  hydrateFromServer: (
    entries: {
      tmdbId: number;
      mediaType: MediaType;
      season: number | null;
      episode: number | null;
      currentTime: number;
      duration: number;
      percentage: number;
      title: string;
      posterPath: string | null;
      releaseDate: string | null;
      completed: boolean;
      lastWatchedAt: Date | string;
    }[],
  ) => void;
  updateMovieProgress: (
    tmdbId: number,
    currentTime: number,
    duration: number,
    metadata: ProgressMetadata,
  ) => void;
  updateTvProgress: (
    tmdbId: number,
    season: number,
    episode: number,
    currentTime: number,
    duration: number,
    metadata: ProgressMetadata,
  ) => void;
  getMovieProgress: (tmdbId: number) => ProgressEntry | undefined;
  getTvProgress: (
    tmdbId: number,
    season: number,
    episode: number,
  ) => ProgressEntry | undefined;
  markMovieCompleted: (tmdbId: number) => void;
  markTvCompleted: (tmdbId: number, season: number, episode: number) => void;
  getNextTvEpisode: (
    tmdbId: number,
    currentSeason: number,
    currentEpisode: number,
  ) => { season: number; episode: number } | undefined;
  removeMovieProgress: (tmdbId: number) => void;
  removeTvProgress: (tmdbId: number, season: number, episode: number) => void;
  clearAll: () => void;
  getContinueWatching: () => ContinueWatchingItem[];
  flushPendingWrites: () => PendingWrite[];
};
