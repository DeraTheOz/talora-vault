import { getTranslations } from "next-intl/server";
import SearchBar from "@/app/components/media/search/search-bar";
import SeriesSection from "@/app/components/series/series-section";

export default async function Page() {
  const t = await getTranslations("browse");

  return (
    <div className="space-y-6 md:space-y-8 pb-6">
      <SearchBar placeholder={t("tvSearchPlaceholder")} searchType="tv" />

      <SeriesSection id="series-heading" />
    </div>
  );
}
