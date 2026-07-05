import SearchBar from "@/app/components/forms/search-bar";
import MediaSection from "@/app/components/media/media-section";

export default function Page() {
  return (
    <div className="space-y-6 md:space-y-8 pb-6">
      <SearchBar placeholder="Search for movies" />

      <MediaSection title="Movies" id="movies-heading" />
    </div>
  );
}
