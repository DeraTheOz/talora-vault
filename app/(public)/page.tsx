import { getTranslations } from "next-intl/server";
import SearchBar from "../components/media/search/search-bar";
import Trending from "../components/media/trending";
import ContinueWatching from "../components/media/continue-watching";
import Popular from "../components/media/popular";
import TopRated from "../components/media/top-rated";
import NowPlaying from "../components/media/now-playing";
import OnTheAir from "../components/media/on-the-air";
import AiringToday from "../components/media/airing-today";
import Upcoming from "../components/media/upcoming";

export default async function Page() {
  const t = await getTranslations("home");

  return (
    <div className="space-y-6 md:space-y-8 pb-6">
      <SearchBar placeholder={t("searchPlaceholder")} />

      <Trending id="trending-heading" />

      <ContinueWatching />

      <Popular id="popular-heading" />

      <TopRated id="top-rated-heading" />

      <NowPlaying id="now-playing-heading" />

      <OnTheAir id="on-the-air-heading" />

      <AiringToday id="airing-today-heading" />

      <Upcoming id="upcoming-heading" />
    </div>
  );
}
