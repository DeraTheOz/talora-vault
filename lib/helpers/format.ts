/**
 * Shared formatting utilities for media metadata.
 * Used by both movie and series detail pages.
 */

/**
 * Converts a runtime in minutes to a human-readable string.
 * e.g. 148 → "2h 28m", 45 → "45m", null → "N/A"
 *
 * @param minutes - Runtime in minutes, or null/undefined if unavailable.
 * @returns Human-readable runtime string (e.g. "2h 28m") or "N/A".
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
 *
 * @param dateStr - TMDB date string in YYYY-MM-DD format.
 * @returns 4-digit release year or "TBA".
 */
export function formatReleaseYear(dateStr: string | null | undefined): string {
  if (!dateStr || dateStr.length < 4) return "TBA";
  return dateStr.slice(0, 4);
}

/**
 * Formats a vote average to one decimal place for display.
 * e.g. 7.654 → "7.7", 0 → "N/A"
 *
 * @param voteAverage - Numeric vote average rating.
 * @returns Formatted rating string with 1 decimal place or "N/A".
 */
export function formatRating(voteAverage: number): string {
  if (!voteAverage || voteAverage === 0) return "N/A";
  return voteAverage.toFixed(1);
}

/**
 * Formats a numeric count with singular/plural labels.
 * e.g. 1 Season -> "1 Season", 3 Seasons -> "3 Seasons"
 *
 * @param value - The count value.
 * @param singular - Singular label string.
 * @param plural - Plural label string.
 * @returns Formatted string combining count and singular/plural label.
 */
export function formatCount(
  value: number,
  singular: string,
  plural: string,
): string {
  return `${value} ${value === 1 ? singular : plural}`;
}

/**
 * Formats a Date object or date string into a medium date with short time format.
 * e.g. "Oct 12, 2023, 3:45 PM"
 *
 * @param date - The Date object or date string to format.
 * @returns Formatted date and time string in `en-US` locale.
 */
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

/**
 * Extracts the first name from a user's full name string if it contains spaces.
 *
 * @param name - The user's full name or display name string, or null/undefined.
 * @returns The first name or original display name string.
 */
export function formatName(name: string | null | undefined): string {
  if (!name) return "";
  const trimmed = name.trim();
  const spaceIndex = trimmed.indexOf(" ");
  if (spaceIndex === -1) return trimmed;
  return trimmed.slice(0, spaceIndex);
}
