type TmdbImageSize = "original" | "w92" | "w300" | "w500" | "w780";

export function getTmdbImageUrl(
  path: string | null | undefined,
  size: TmdbImageSize = "original",
): string {
  if (!path) return "";

  const baseUrl =
    process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p";
  const formattedPath = path.startsWith("/") ? path : `/${path}`;

  return `${baseUrl}/${size}${formattedPath}`;
}

// type TmdbImageSize = "original" | "w300" | "w500" | "w780";

// export function getTmdbImageUrl(
//   path: string,
//   size: TmdbImageSize = "original",
// ) {
//   const baseUrl =
//     process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p";

//   return `${baseUrl}/${size}${path}`;
// }
