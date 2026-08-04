import { getTranslations } from "next-intl/server";
import SearchBar from "../components/media/search/search-bar";
import NowPlayingSection from "../components/media/now-playing-section";
import TopRatedSection from "../components/media/top-rated-section";
import TrendingSection from "../components/media/trending-section";

export default async function Page() {
  const t = await getTranslations("home");

  return (
    <div className="space-y-6 md:space-y-8 pb-6">
      <SearchBar placeholder={t("searchPlaceholder")} />

      <TrendingSection id="trending-heading" />

      <TopRatedSection id="top-rated-heading" />

      <NowPlayingSection id="now-playing-heading" />
    </div>
  );
}
