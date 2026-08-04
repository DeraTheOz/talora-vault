import ProfileHeader from "@/app/components/profile/profile-header";
import ProfileStats from "@/app/components/profile/profile-stats";
import ProfileActivity from "@/app/components/profile/profile-activity";
import { auth } from "@/auth";
import { db } from "@/db/client";
import { users, accounts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCachedUserWatchlist } from "@/features/watchlist/api/get-user-watchlist";
import { getWatchlistMedia } from "@/features/watchlist/api/get-watchlist-media";
import {
  getCachedUserReviews,
  enrichReviewsWithTmdbData,
} from "@/features/reviews/api/get-user-reviews";
import DeleteAccount from "@/app/components/profile/delete-account";
import ChangePassword from "@/app/components/profile/change-password";
import { getLocale, getTranslations } from "next-intl/server";

export default async function ProfilePage() {
  const session = await auth();
  const t = await getTranslations("profile");
  const locale = await getLocale();

  const [dbUser] = await db
    .select({
      name: users.name,
      image: users.image,
      bio: users.bio,
      language: users.language,
      createdAt: users.createdAt,
      emailVerified: users.emailVerified,
    })
    .from(users)
    .where(eq(users.id, session!.user.id))
    .limit(1);

  const [account] = await db
    .select({ provider: accounts.provider })
    .from(accounts)
    .where(eq(accounts.userId, session!.user.id))
    .limit(1);

  const user = {
    name: dbUser?.name ?? null,
    email: session?.user?.email ?? "",
    image: dbUser?.image ?? null,
    bio: dbUser?.bio ?? null,
    language: dbUser?.language ?? "en",
    emailVerified: dbUser?.emailVerified ?? null,
    createdAt: dbUser?.createdAt ?? new Date(),
    authProvider: (account?.provider === "google"
      ? "google"
      : "credentials") as "google" | "credentials",
  };

  // Fetch watchlist for stats and recent items
  const watchlist = await getCachedUserWatchlist(session!.user.id);
  const movieCount = watchlist.filter(
    (item) => item.mediaType === "movie",
  ).length;
  const tvCount = watchlist.filter((item) => item.mediaType === "tv").length;
  const watchlistCount = movieCount + tvCount;
  const recentWatchlist = await getWatchlistMedia(watchlist.slice(0, 5), locale);
  const recentWatchlistItems = recentWatchlist.map((item) => ({
    tmdbId: item.id,
    title: item.title,
    posterPath: item.poster_path,
    mediaType: item.media_type,
    addedAt: item.addedAt,
  }));

  // Fetch reviews for stats and recent items
  const userReviews = await getCachedUserReviews(session!.user.id);
  const reviewCount = userReviews.length;
  const averageRating =
    reviewCount > 0
      ? userReviews.reduce((sum, review) => sum + review.rating, 0) /
        reviewCount
      : null;
  const recentReviews = await enrichReviewsWithTmdbData(
    userReviews.slice(0, 3),
    locale,
  );

  return (
    <div className="space-y-6 mb-16 md:space-y-8 pl-1.5 xl:pr-8">
      <h1 className="sr-only">{t("pageTitle")}</h1>

      <ProfileHeader
        name={user.name}
        email={user.email}
        image={user.image}
        bio={user.bio}
        language={user.language}
        createdAt={user.createdAt}
        authProvider={user.authProvider}
        emailVerified={user.emailVerified}
      />

      <ProfileStats
        movieCount={movieCount}
        tvCount={tvCount}
        watchlistCount={watchlistCount}
        reviewCount={reviewCount}
        averageRating={averageRating}
      />

      <ProfileActivity
        recentWatchlist={recentWatchlistItems}
        recentReviews={recentReviews}
      />

      {user.authProvider === "credentials" ? <ChangePassword /> : null}

      <DeleteAccount authProvider={user.authProvider} email={user.email} />
    </div>
  );
}
