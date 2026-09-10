const STREAM_BASE = (process.env.NEXT_PUBLIC_STREAM_BASE_URL ?? "").replace(
  /\/+$/,
  "",
);

export function buildEmbedUrl(
  type: string,
  id: number,
  season?: string,
  episode?: string,
  startTime?: number,
): string {
  if (type === "movie") {
    return typeof startTime === "number" && startTime > 0
      ? `${STREAM_BASE}/movie/${id}?t=${Math.floor(startTime)}`
      : `${STREAM_BASE}/movie/${id}`;
  }

  const base = `${STREAM_BASE}/tv/${id}?s=${season || 1}&e=${episode || 1}`;

  return typeof startTime === "number" && startTime > 0
    ? `${base}&t=${Math.floor(startTime)}`
    : base;
}
