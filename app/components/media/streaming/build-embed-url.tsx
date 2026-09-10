import { STREAM_BASE_URL } from "@/lib/constants/stream";

export function buildEmbedUrl(
  type: string,
  id: number,
  season?: string,
  episode?: string,
  startTime?: number,
): string {
  if (type === "movie") {
    return typeof startTime === "number" && startTime > 0
      ? `${STREAM_BASE_URL}/movie/${id}?t=${Math.floor(startTime)}`
      : `${STREAM_BASE_URL}/movie/${id}`;
  }

  const base = `${STREAM_BASE_URL}/tv/${id}?s=${season || 1}&e=${episode || 1}`;

  return typeof startTime === "number" && startTime > 0
    ? `${base}&t=${Math.floor(startTime)}`
    : base;
}
