import { auth } from "@/auth";
import WatchlistGrid from "@/app/components/watchlist/watchlist-grid";
import WatchlistSection from "@/app/components/watchlist/watchlist-section";
import { getWatchlistMedia } from "@/features/watchlist/api/get-watchlist-media";
import { getCachedUserWatchlist } from "@/features/watchlist/api/get-user-watchlist";

export default async function Page() {
  const session = await auth();

  // Not signed in — show empty state with login CTA
  if (!session?.user) {
    return (
      <div className="space-y-6 pb-6 md:space-y-8">
        <WatchlistGrid media={[]} isSignedIn={false} />
      </div>
    );
  }

  const watchlist = await getCachedUserWatchlist(session.user.id);

  // Empty watchlist — show empty state with explore CTA
  if (watchlist.length === 0) {
    return (
      <div className="space-y-6 pb-6 md:space-y-8">
        <WatchlistGrid media={[]} isSignedIn />
      </div>
    );
  }

  // Has items — enrich with TMDB data and pass to WatchlistSection
  const media = await getWatchlistMedia(watchlist);

  return (
    <div className="space-y-6 pb-6 md:space-y-8 pl-1.5">
      <WatchlistSection media={media} />
    </div>
  );
}
