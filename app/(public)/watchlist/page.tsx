import { auth } from "@/auth";
import SearchBar from "@/app/components/forms/search-bar";
import WatchlistGrid from "@/app/components/watchlist/watchlist-grid";
import { getWatchlistMedia } from "@/features/watchlist/api/get-watchlist-media";
import { getUserWatchlistItems } from "@/features/watchlist/actions/watchlist-actions";

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="space-y-6 pb-6 md:space-y-8">
        <WatchlistGrid media={[]} isSignedIn={false} />
      </div>
    );
  }

  const items = await getUserWatchlistItems();
  const media = await getWatchlistMedia(items);

  return (
    <div className="space-y-6 pb-6 md:space-y-8">
      {media.length > 0 ? (
        <SearchBar placeholder="Search your watchlist" />
      ) : null}

      <WatchlistGrid media={media} isSignedIn />
    </div>
  );
}
