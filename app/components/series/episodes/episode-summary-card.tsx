import { useTranslations } from "next-intl";
import { TmdbTvEpisode } from "@/features/series/types/series-detail";

interface EpisodeSummaryCardProps {
  episode?: TmdbTvEpisode;
}

export default function EpisodeSummaryCard({
  episode,
}: EpisodeSummaryCardProps) {
  const t = useTranslations("detail");

  if (!episode) return null;

  return (
    <article className="rounded-lg bg-talora-dark-blue p-4">
      <p className="text-xs uppercase text-talora-white/50">
        {t("seasonEpisodeLabel", {
          season: episode.season_number,
          episode: episode.episode_number,
        })}
        {episode.runtime
          ? ` • ${t("runtimeMinutes", { runtime: episode.runtime })}`
          : ` • ${t("runtimeUnavailable")}`}
      </p>

      <h3 className="mt-1 text-lg font-medium">{episode.name}</h3>

      <p className="mt-2 text-sm text-talora-white/65">
        {episode.overview || t("noEpisodeOverview")}
      </p>
    </article>
  );
}
