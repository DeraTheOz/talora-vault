import { ProfileStatsProps } from "@/features/profile/types/profile";
import {
  Film02Icon,
  Tv01Icon,
  Bookmark02Icon,
  StarIcon,
  Comment01Icon,
} from "@hugeicons/core-free-icons";

export function createStatCards(
  t: (key: string) => string,
  statsProps: ProfileStatsProps,
): {
  key: string;
  label: string;
  icon: typeof Film02Icon;
  color: string;
  bg: string;
  getValue: (props: typeof statsProps) => string;
}[] {
  return [
    {
      key: "movies",
      label: t("movies"),
      icon: Film02Icon,
      color: "text-talora-red",
      bg: "bg-talora-red/10",
      getValue: (props) => props.movieCount.toFixed(0),
    },
    {
      key: "tv",
      label: t("tvSeries"),
      icon: Tv01Icon,
      color: "text-talora-red",
      bg: "bg-talora-red/10",
      getValue: (props) => props.tvCount.toFixed(0),
    },
    {
      key: "watchlist",
      label: t("totalBookmarks"),
      icon: Bookmark02Icon,
      color: "text-talora-red",
      bg: "bg-talora-red/10",
      getValue: (props) => props.watchlistCount.toFixed(0),
    },
    {
      key: "reviews",
      label: t("reviews"),
      icon: Comment01Icon,
      color: "text-talora-red",
      bg: "bg-talora-red/10",
      getValue: (props) => props.reviewCount.toFixed(0),
    },
    {
      key: "rating",
      label: t("avgRating"),
      icon: StarIcon,
      color: "text-talora-red",
      bg: "bg-talora-red/10",
      getValue: (props) =>
        props.averageRating ? props.averageRating.toFixed(1) : "—",
    },
  ];
}
