export type ProfileStatsProps = {
  movieCount: number;
  tvCount: number;
  watchlistCount: number;
  reviewCount: number;
  averageRating: number | null;
};

export type RecentWatchlistItem = {
  tmdbId: number;
  title: string;
  posterPath: string | null;
  mediaType: "movie" | "tv";
  addedAt: Date;
};

export type RecentReviewItem = {
  tmdbId: number;
  title: string;
  mediaType: "movie" | "tv";
  rating: number;
  content: string | null;
  createdAt: Date;
};
