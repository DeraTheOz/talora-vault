import { TmdbTvEpisode } from "@/features/series/types/series-detail";

interface EpisodeSummaryCardProps {
  episode?: TmdbTvEpisode;
}

export default function EpisodeSummaryCard({
  episode,
}: EpisodeSummaryCardProps) {
  if (!episode) return null;

  return (
    <article className="rounded-lg bg-talora-dark-blue p-4">
      <p className="text-xs uppercase text-talora-white/50">
        Season {episode.season_number} • Episode {episode.episode_number}
        {episode.runtime
          ? ` • ${episode.runtime} min`
          : " • Runtime unavailable"}
      </p>

      <h3 className="mt-1 text-lg font-medium">{episode.name}</h3>

      <p className="mt-2 text-sm text-talora-white/65">
        {episode.overview || "No episode overview is available yet."}
      </p>
    </article>
  );
}
