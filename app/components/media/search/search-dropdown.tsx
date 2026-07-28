"use client";

import type { SearchResult } from "@/features/search/types/search";
import SearchResultItem from "./search-result-item";
import SearchHistoryItem from "./search-history-item";
import SearchLoadingSkeleton from "./search-loading-skeleton";
import SearchEmptyState from "./search-empty-state";

type RecentSearch = {
  id: string;
  query: string;
  searchedAt: Date;
};

interface SearchDropdownProps {
  isOpen: boolean;
  query: string;
  results: SearchResult[] | undefined;
  isResultsLoading: boolean;
  recentSearches: RecentSearch[];
  isHistoryLoading: boolean;
  selectedIndex?: number;
  onResultSelect: (result?: SearchResult) => void;
  onHistorySelect: (query: string) => void;
  onHistoryDelete: (id: string) => void;
}

export default function SearchDropdown({
  isOpen,
  query,
  results,
  isResultsLoading,
  recentSearches,
  isHistoryLoading,
  selectedIndex = -1,
  onResultSelect,
  onHistorySelect,
  onHistoryDelete,
}: SearchDropdownProps) {
  if (!isOpen) return null;

  const hasQuery = query.trim().length >= 2;
  const hasResults = Array.isArray(results) && results.length > 0;
  const showNoResults =
    hasQuery &&
    !isResultsLoading &&
    results !== undefined &&
    results.length === 0;
  const showRecentSearches =
    !hasQuery && recentSearches.length > 0 && !isHistoryLoading;
  const showResults = hasQuery && hasResults;

  if (!hasQuery && recentSearches.length === 0) return null;

  return (
    <div
      id="search-dropdown"
      role="listbox"
      aria-label="Search results"
      className="absolute left-0 right-0 top-full z-50 mt-4 max-h-96 overflow-y-auto rounded-xl bg-talora-semi-dark-blue shadow-lg shadow-black/40 scrollbar-none xl:right-6">
      {/* Loading state */}
      {hasQuery && isResultsLoading && <SearchLoadingSkeleton />}

      {/* No results state */}
      {showNoResults && <SearchEmptyState query={query} />}

      {/* Recent searches section */}
      {showRecentSearches && (
        <div className="p-3">
          <p className="mb-1 px-3 text-xs font-medium uppercase tracking-wider text-talora-white/40">
            Recent Searches
          </p>
          <ul className="space-y-0.5">
            {recentSearches.map((search, index) => (
              <SearchHistoryItem
                key={search.id}
                id={search.id}
                query={search.query}
                isHighlighted={selectedIndex === index}
                onSelect={onHistorySelect}
                onDelete={onHistoryDelete}
              />
            ))}
          </ul>
        </div>
      )}

      {/* Search results section */}
      {showResults && (
        <div className="p-3">
          <p className="mb-1 px-3 text-xs font-medium uppercase tracking-wider text-talora-white/40">
            Results
          </p>
          <ul className="space-y-0.5">
            {results.map((result, index) => (
              <SearchResultItem
                key={`${result.mediaType}-${result.id}`}
                result={result}
                isHighlighted={selectedIndex === index}
                onSelect={() => onResultSelect(result)}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
