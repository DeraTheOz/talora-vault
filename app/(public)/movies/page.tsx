import SearchBar from "@/app/components/forms/search-bar";
import MovieSection from "@/app/components/movie/movie-section";

export default function Page() {
  return (
    <div className="space-y-6 md:space-y-8 pb-6">
      <SearchBar placeholder="Search for movies" />

      <MovieSection title="Movies" id="movies-heading" />
    </div>
  );
}
