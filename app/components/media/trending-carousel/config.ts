export const PREVIEW_COUNT = 10;
export const AUTOPLAY_MS = 6000;

export const pad = (n: number) => String(n).padStart(2, "0");

export const springTransition = {
  type: "spring",
  stiffness: 170,
  damping: 26,
  mass: 0.9,
} as const;

export const fadeTransition = { duration: 0.45, ease: "easeOut" } as const;

export type SlideRank = "active" | "near" | "mid" | "far";

export const rankFilterClass: Record<SlideRank, string> = {
  active: "",
  near: "blur-[2px] grayscale",
  mid: "blur-sm grayscale",
  far: "blur-md grayscale",
};

export interface SlidePose {
  x: number;
  y: number;
  scale: number;
  opacity: number;
  rank: SlideRank;
  zIndex: number;
}

export function getSlidePose(
  index: number,
  activeIndex: number,
  stageWidth: number,
): SlidePose {
  const width = stageWidth || 320;
  const delta = index - activeIndex;

  if (delta === 0) {
    return {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      rank: "active",
      zIndex: 30,
    };
  }

  const distance = Math.abs(delta);

  if (distance === 1) {
    return {
      x: delta * width * 0.92,
      y: 24,
      scale: 0.58,
      opacity: 0.5,
      rank: "near",
      zIndex: 20,
    };
  }

  if (distance === 2) {
    return {
      x: delta * width * 1.6,
      y: 36,
      scale: 0.44,
      opacity: 0.12,
      rank: "mid",
      zIndex: 12,
    };
  }

  return {
    x: delta * width * 2.15,
    y: 42,
    scale: 0.38,
    opacity: 0,
    rank: "far",
    zIndex: 8,
  };
}
