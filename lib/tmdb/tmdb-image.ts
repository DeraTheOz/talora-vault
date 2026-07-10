type TmdbImageSize = "original" | "w300" | "w500" | "w780";

export function getTmdbImageUrl(
  path: string,
  size: TmdbImageSize = "original",
) {
  const baseUrl =
    process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p";

  return `${baseUrl}/${size}${path}`;
}
