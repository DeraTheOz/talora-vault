"use client";

import type { MediaType } from "@/features/media/types/media";
import { usePlayer } from "@/features/media/hooks/use-player";
import { useAdblock } from "@/features/media/hooks/use-adblock";

interface PlayerProps {
  embedUrl: string;
  title?: string;
  mediaType?: MediaType;
  tmdbId?: number;
  season?: number;
  episode?: number;
  posterPath?: string | null;
  releaseDate?: string | null;
  resumeTime?: number;
  onEpisodeChange?: (season: number, episode: number) => void;
}

export default function Player(props: PlayerProps) {
  const { title } = props;
  const { src, iframeRef } = usePlayer(props);
  useAdblock();

  return (
    <div className="relative min-h-80 w-full aspect-video overflow-hidden rounded-lg bg-black">
      <iframe
        ref={iframeRef}
        src={src}
        title={title ?? ""}
        referrerPolicy="no-referrer"
        className="w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin allow-presentation"
        allow="fullscreen; encrypted-media; picture-in-picture"
        loading="lazy"></iframe>
    </div>
  );
}
