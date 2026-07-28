import SearchBar from "@/app/components/media/search/search-bar";
import SeriesSection from "@/app/components/series/series-section";

export default function Page() {
  return (
    <div className="space-y-6 md:space-y-8 pb-6">
      <SearchBar placeholder="Search for tv-series" searchType="tv" />

      <SeriesSection title="TV Series" id="series-heading" />
    </div>
  );
}
