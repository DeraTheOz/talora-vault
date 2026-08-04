import { SearchType, TmdbSearchApiResponse } from "../types/search";

/**
 * Fetches search results from the internal TMDB search proxy.
 *
 * @param query - The user's search string (must be pre-trimmed).
 * @param type - The search type: "multi" (homepage), "movie" (movies page), or "tv" (series page).
 * @param page - The page number to fetch (defaults to 1).
 * @returns A promise resolving to the TMDB search API response.
 * @throws An error if the fetch response is not OK.
 */
export async function getSearchResults(
  query: string,
  type: SearchType = "multi",
  page = 1,
  lang = "en",
): Promise<TmdbSearchApiResponse> {
  const searchParams = new URLSearchParams({
    q: query,
    type,
    page: String(page),
    lang,
  });

  const response = await fetch(`/api/tmdb/search?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error("Unable to search titles");
  }

  return response.json();
}
