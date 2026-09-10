"use client";

import { useWatchProgressSync } from "@/features/watch-progress/hooks/use-watch-progress-sync";

type WatchProgressProviderProps = {
  isSignedIn: boolean;
  children: React.ReactNode;
};

export function WatchProgressProvider({
  isSignedIn,
  children,
}: WatchProgressProviderProps) {
  useWatchProgressSync(isSignedIn);
  return children;
}
