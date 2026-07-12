import SearchBar from "../components/forms/search-bar";
import NowPlayingSection from "../components/media/now-playing-section";
import TopRatedSection from "../components/media/top-rated-section";
import TrendingSection from "../components/media/trending-section";

export default function Page() {
  return (
    <div className="space-y-6 md:space-y-8 pb-6">
      <SearchBar placeholder="Search for movies or TV series" />

      <TrendingSection title="Trending" id="trending-heading" />

      <TopRatedSection title="Top Rated" id="top-rated-heading" />

      <NowPlayingSection title="Now Playing" id="now-playing-heading" />
    </div>
  );
}
