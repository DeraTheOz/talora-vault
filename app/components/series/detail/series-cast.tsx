"use client";

import { getTmdbImageUrl } from "@/lib/tmdb/tmdb-image";
import Cast from "@/app/components/media/cast/cast";
import type { CastMember } from "@/app/components/media/cast/cast";
import { CastSkeleton } from "@/app/components/media/media-skeletons";
import { useTvCredits } from "@/features/series/hooks/use-series-credits";

interface TvCastProps {
  id: string;
}

export default function TvCast({ id }: TvCastProps) {
  const { data, isLoading, error } = useTvCredits(id);

  if (isLoading) return <CastSkeleton />;

  // Skip the section if credits fail
  if (error || !data?.cast?.length) return null;

  const cast: CastMember[] = data.cast.map((member) => ({
    name: member.name,
    role: member.character || "Unknown role",
    image: member.profile_path
      ? getTmdbImageUrl(member.profile_path, "w300")
      : null,
  }));

  return <Cast cast={cast} />;
}
