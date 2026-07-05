import SearchBar from "../components/forms/search-bar";
import MediaSection from "../components/media/media-section";
import TrendingSection from "../components/media/trending-section";

export default function Page() {
  return (
    <div className="space-y-6 md:space-y-8 pb-6">
      <SearchBar placeholder="Search for movies or TV series" />

      <TrendingSection title="Trending" id="trending-heading" />

      <MediaSection title="Recommended for you" id="recommended-heading" />
    </div>
  );
}
