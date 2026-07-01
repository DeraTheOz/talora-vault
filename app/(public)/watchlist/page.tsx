import SearchBar from "@/app/components/layout/search-bar";
import MediaSection from "@/app/components/media/media-section";

export default function Page() {
  return (
    <div className="space-y-6 md:space-y-8 mb-6">
      <SearchBar placeholder="Search for bookmarked shows" />

      <MediaSection title="Watchlist" id="watchlist-heading" />
    </div>
  );
}
