"use client";

import { useTranslations } from "next-intl";

import { useTrendingCarousel } from "@/features/trending/hooks/use-trending-carousel";

import { getSlidePose } from "./trending-carousel/config";
import AmbientLightField from "./trending-carousel/ambient-light-field";
import TrendingSlide from "./trending-carousel/trending-slide";
import Caption from "./trending-carousel/caption";
import TimelineScrubber from "./trending-carousel/timeline-scrubber";
import { TrendingSkeleton } from "./media-skeletons";
import MediaErrorState from "./media-error-state";

interface TrendingProps {
  id: string;
}

export default function Trending({ id }: TrendingProps) {
  const t = useTranslations("home");

  const {
    isLoading,
    error,
    refetch,
    isFetching,
    items,
    count,
    activeItem,
    activeIndex,
    activeTitle,
    activeBackdrop,
    stageRef,
    stageWidth,
    auroraDelay,
    auroraLift,
    setActiveIndex,
    setIsPaused,
    setIsSectionHovered,
    setIsFocused,
    goNext,
    goPrev,
    handleDragEnd,
  } = useTrendingCarousel();

  if (isLoading) return <TrendingSkeleton />;

  if (error) {
    return (
      <MediaErrorState
        message={t("trendingError")}
        onRetry={() => void refetch()}
        isRetrying={isFetching}
      />
    );
  }

  if (count === 0) return null;

  return (
    <section
      aria-labelledby={id}
      className="relative overflow-x-clip px-4 py-16 md:py-20"
      onMouseEnter={() => setIsSectionHovered(true)}
      onMouseLeave={() => setIsSectionHovered(false)}
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}>
      <AmbientLightField
        auroraDelay={auroraDelay}
        auroraLift={auroraLift}
        activeBackdrop={activeBackdrop}
      />

      <div
        ref={stageRef}
        role="group"
        aria-roledescription="carousel"
        aria-label={t("trendingListLabel")}
        tabIndex={0}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => {
          setIsPaused(true);
          setIsFocused(true);
        }}
        onBlurCapture={() => {
          setIsPaused(false);
          setIsFocused(false);
        }}
        className="relative mx-auto aspect-2/3 w-[min(70vw,16rem)] focus-visible:outline-talora-red sm:w-64 md:w-72 lg:w-80">
        {stageWidth > 0
          ? items.map((item, index) => (
              <TrendingSlide
                key={`${item.media_type}-${item.id}`}
                item={item}
                index={index}
                activeIndex={activeIndex}
                pose={getSlidePose(index, activeIndex, stageWidth)}
                stageWidth={stageWidth}
                onActivate={setActiveIndex}
                onDragEnd={handleDragEnd}
              />
            ))
          : null}
      </div>

      {activeItem ? (
        <Caption activeItem={activeItem} activeIndex={activeIndex} />
      ) : null}

      <TimelineScrubber
        items={items}
        count={count}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
        onPrev={goPrev}
        onNext={goNext}
        onPause={() => setIsPaused(true)}
        onResume={() => setIsPaused(false)}
      />

      <p role="status" aria-live="polite" className="sr-only">
        {t("trendingSlide", {
          index: activeIndex + 1,
          count,
          title: activeTitle,
        })}
      </p>
    </section>
  );
}
