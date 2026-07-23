import { auth } from "@/auth";
import SearchBar from "@/app/components/forms/search-bar";
import WatchlistGrid from "@/app/components/watchlist/watchlist-grid";
import { getWatchlistMedia } from "@/features/watchlist/api/get-watchlist-media";
import { getCachedUserWatchlist } from "@/features/watchlist/api/get-user-watchlist";

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="space-y-6 pb-6 md:space-y-8">
        <WatchlistGrid media={[]} isSignedIn={false} />
      </div>
    );
  }

  const watchlist = session?.user
    ? await getCachedUserWatchlist(session.user.id)
    : [];

  const media = await getWatchlistMedia(watchlist);

  return (
    <div className="space-y-6 pb-6 md:space-y-8">
      {media.length > 0 ? (
        <SearchBar placeholder="Search your watchlist" />
      ) : null}

      <WatchlistGrid media={media} isSignedIn />
    </div>
  );
}
