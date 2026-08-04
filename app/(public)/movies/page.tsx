import { getTranslations } from "next-intl/server";
import SearchBar from "@/app/components/media/search/search-bar";
import MovieSection from "@/app/components/movie/movie-section";

export default async function Page() {
  const t = await getTranslations("browse");

  return (
    <div className="space-y-6 md:space-y-8 pb-6">
      <SearchBar placeholder={t("moviesSearchPlaceholder")} searchType="movie" />

      <MovieSection id="movies-heading" />
    </div>
  );
}
