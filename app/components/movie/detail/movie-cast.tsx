"use client";

import { useMovieCredits } from "@/features/movie/hooks/use-movie-credits";
import { getTmdbImageUrl } from "@/lib/tmdb/tmdb-image";
import Cast from "@/app/components/media/cast/cast";
import type { CastMember } from "@/app/components/media/cast/cast";
import { CastSkeleton } from "@/app/components/media/media-skeletons";

interface MovieCastProps {
  id: string;
}

export default function MovieCast({ id }: MovieCastProps) {
  const { data, isLoading, error } = useMovieCredits(id);

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
