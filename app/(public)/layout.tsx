import { auth } from "@/auth";
import Sidebar from "@/app/components/layout/sidebar";
import { BookmarkProvider } from "../components/providers/bookmark-provider";
import { getCachedUserWatchlist } from "@/features/watchlist/api/get-user-watchlist";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  // Use cached watchlist fetcher
  const watchlistItems = session?.user
    ? await getCachedUserWatchlist(session.user.id)
    : [];
  const initialBookmarkItems = watchlistItems.map((item) => ({
    tmdbId: item.tmdbId,
    mediaType: item.mediaType,
  }));

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-talora-white focus:px-4 focus:py-2 focus:text-talora-dark-blue">
        Skip to main content
      </a>

      <div className="mx-auto flex h-dvh w-full flex-col overflow-hidden gap-6 px-4 py-4 md:px-6 md:py-6 xl:flex-row xl:gap-9 xl:px-0 xl:py-0">
        <Sidebar />

        <main
          id="main-content"
          tabIndex={-1}
          className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto scrollbar-none outline-none xl:pt-6">
          <BookmarkProvider
            initialItems={initialBookmarkItems}
            isSignedIn={Boolean(session?.user?.id)}>
            {children}
          </BookmarkProvider>
        </main>
      </div>
    </>
  );
}
