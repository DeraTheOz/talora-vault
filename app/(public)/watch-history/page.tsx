import { auth } from "@/auth";
import WatchHistoryGrid from "@/app/components/watch-history/watch-history-grid";
import WatchHistorySection from "@/app/components/watch-history/watch-history-section";

export default async function Page() {
  const session = await auth();

  // Not signed in — show empty state with login CTA
  if (!session?.user) {
    return (
      <div className="space-y-6 pb-6 md:space-y-8">
        <WatchHistoryGrid items={[]} isSignedIn={false} />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-6 md:space-y-8">
      <WatchHistorySection />
    </div>
  );
}