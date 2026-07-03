import { Video01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import type { CustomSelectOption } from "@/app/components/forms/custom-select";
import type { SeriesEpisode } from "@/app/data/series-detail";
import EpisodeSelectField from "./episode-select-field";
import EpisodeSummaryCard from "./episode-summary-card";

interface EpisodeSelectorProps {
  episodes: SeriesEpisode[];
}

function getSeasonOptions(episodes: SeriesEpisode[]): CustomSelectOption[] {
  const seasons = Array.from(
    new Set(episodes.map((episode) => episode.seasonNumber)),
  ).sort((a, b) => a - b);

  return seasons.map((season) => ({
    value: String(season),
    label: `Season ${season}`,
  }));
}

function getEpisodeOptions(episodes: SeriesEpisode[]): CustomSelectOption[] {
  return episodes.map((episode) => ({
    value: episode.id,
    label: `S${episode.seasonNumber}:E${episode.episodeNumber} - ${episode.title}`,
  }));
}

export default function EpisodeSelector({ episodes }: EpisodeSelectorProps) {
  const firstEpisode = episodes[0];
  const seasonOptions = getSeasonOptions(episodes);
  const episodeOptions = getEpisodeOptions(episodes);

  return (
    <section id="episode-selector" aria-labelledby="episode-selector-title">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 id="episode-selector-title" className="text-2xl font-normal">
          Episodes
        </h2>
      </div>

      <form className="rounded-lg bg-talora-semi-dark-blue p-4 md:p-6">
        {/* Later with React Hook Form: register season and episode, watch season, then fetch/filter episodes with TanStack Query. */}
        <div className="grid gap-4 md:grid-cols-2">
          <EpisodeSelectField
            id="season"
            name="season"
            label="Select season"
            options={seasonOptions}
            defaultValue={String(firstEpisode?.seasonNumber ?? "")}
          />

          <EpisodeSelectField
            id="episode"
            name="episode"
            label="Select episode"
            options={episodeOptions}
            defaultValue={firstEpisode?.id}
          />
        </div>

        <button
          type="button"
          className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg bg-talora-red px-5 text-sm font-medium text-talora-white transition hover:bg-talora-red/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-talora-white active:scale-95">
          <HugeiconsIcon icon={Video01Icon} size={18} color="currentColor" />
          Load episode
        </button>

        <div className="mt-5">
          <EpisodeSummaryCard episode={firstEpisode} />
        </div>
      </form>
    </section>
  );
}
