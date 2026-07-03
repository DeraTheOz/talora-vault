import type { SeriesEpisode } from "@/app/data/series-detail";

interface EpisodeSummaryCardProps {
  episode?: SeriesEpisode;
}

export default function EpisodeSummaryCard({
  episode,
}: EpisodeSummaryCardProps) {
  if (!episode) return null;

  return (
    <article className="rounded-lg bg-talora-dark-blue p-4">
      <p className="text-xs uppercase text-talora-white/50">
        Season {episode.seasonNumber} • Episode {episode.episodeNumber} •{" "}
        {episode.runtime}
      </p>

      <h3 className="mt-1 text-lg font-medium">{episode.title}</h3>

      <p className="mt-2 text-sm text-talora-white/65">{episode.overview}</p>
    </article>
  );
}
