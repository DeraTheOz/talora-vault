"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { PanInfo } from "framer-motion";

import { useTrendingTitles } from "./use-trending-titles";
import { getTmdbImageUrl } from "@/lib/tmdb/tmdb-image";
import {
  AUTOPLAY_MS,
  PREVIEW_COUNT,
} from "@/app/components/media/trending-carousel/config";

export function useTrendingCarousel() {
  const mediaT = useTranslations("media");
  const reducedMotion = useReducedMotion();

  const { data, isLoading, error, refetch, isFetching } = useTrendingTitles();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isSectionHovered, setIsSectionHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [stageWidth, setStageWidth] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);

  const items = (data?.results ?? []).slice(0, PREVIEW_COUNT);
  const count = items.length;
  const activeItem = items[activeIndex];

  useLayoutEffect(() => {
    const measure = () => {
      if (stageRef.current) setStageWidth(stageRef.current.offsetWidth);
    };

    measure();

    const observer = new ResizeObserver(measure);
    if (stageRef.current) observer.observe(stageRef.current);

    return () => observer.disconnect();
  }, [count]);

  useEffect(() => {
    if (count < 2 || reducedMotion || isPaused) return;

    const timer = setTimeout(() => {
      setActiveIndex((index) => (index + 1) % count);
    }, AUTOPLAY_MS);

    return () => clearTimeout(timer);
  }, [activeIndex, count, isPaused, reducedMotion]);

  const auroraX = useSpring(activeIndex, { stiffness: 90, damping: 22 });
  const auroraDelay = useTransform(
    auroraX,
    (value) => `${28 - (value % 9) * 3}%`,
  );
  const auroraLift = useTransform(
    auroraX,
    (value) => `${-12 - (value % 5) * 6}%`,
  );

  const goNext = () => setActiveIndex((index) => (index + 1) % count);
  const goPrev = () => setActiveIndex((index) => (index - 1 + count) % count);

  useEffect(() => {
    if (count < 2) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isSectionHovered && !isFocused) return;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((index) => (index + 1) % count);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((index) => (index - 1 + count) % count);
      } else if (event.key === "Home") {
        event.preventDefault();
        setActiveIndex(0);
      } else if (event.key === "End") {
        event.preventDefault();
        setActiveIndex(count - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [count, isSectionHovered, isFocused]);

  const handleDragEnd = (_event: unknown, info: PanInfo) => {
    if (reducedMotion) return;

    if (info.velocity.x < -320 || info.offset.x < -64) {
      goNext();
    } else if (info.velocity.x > 320 || info.offset.x > 64) {
      goPrev();
    }
  };

  const activeTitle = activeItem
    ? activeItem.title ?? activeItem.name ?? mediaT("untitled")
    : "";
  const activeBackdropPath =
    activeItem?.backdrop_path ?? activeItem?.poster_path;
  const activeBackdrop = activeBackdropPath
    ? getTmdbImageUrl(activeBackdropPath, "w780")
    : null;

  return {
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
    setActiveIndex,
    setIsPaused,
    setIsSectionHovered,
    setIsFocused,
    auroraDelay,
    auroraLift,
    goNext,
    goPrev,
    handleDragEnd,
  };
}