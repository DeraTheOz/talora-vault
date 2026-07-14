/**
 * Shared formatting utilities for media metadata.
 * Used by both movie and series detail pages.
 */

/**
 * Converts a runtime in minutes to a human-readable string.
 * e.g. 148 → "2h 28m", 45 → "45m", null → "N/A"
 */
export function formatRuntime(minutes: number | null | undefined): string {
  if (!minutes || minutes <= 0) return "N/A";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

/**
 * Extracts the 4-digit year from a TMDB date string (YYYY-MM-DD).
 * Returns "TBA" when the date is missing or invalid.
 */
export function formatReleaseYear(dateStr: string | null | undefined): string {
  if (!dateStr || dateStr.length < 4) return "TBA";
  return dateStr.slice(0, 4);
}

/**
 * Formats a vote average to one decimal place for display.
 * e.g. 7.654 → "7.7", 0 → "N/A"
 */
export function formatRating(voteAverage: number): string {
  if (!voteAverage || voteAverage === 0) return "N/A";
  return voteAverage.toFixed(1);
}
