"use server";

import { auth } from "@/auth";
import { db } from "@/db/client";
import { and, eq, isNull } from "drizzle-orm";

import type { MediaType } from "@/features/media/types/media";
import { watchProgress } from "@/db/schema/watch-progress";

type UpsertProgressInput = {
  tmdbId: number;
  mediaType: MediaType;
  season?: number;
  episode?: number;
  currentTime: number;
  duration: number;
  percentage: number;
  title: string;
  posterPath: string | null;
  releaseDate: string | null;
  completed: boolean;
};

function buildWhereClause(userId: string, input: UpsertProgressInput) {
  const seasonCondition =
    input.season != null
      ? eq(watchProgress.season, input.season)
      : isNull(watchProgress.season);

  const episodeCondition =
    input.episode != null
      ? eq(watchProgress.episode, input.episode)
      : isNull(watchProgress.episode);

  return and(
    eq(watchProgress.userId, userId),
    eq(watchProgress.tmdbId, input.tmdbId),
    eq(watchProgress.mediaType, input.mediaType),
    seasonCondition,
    episodeCondition,
  );
}

export async function upsertWatchProgress(input: UpsertProgressInput) {
  const session = await auth();
  if (!session?.user?.id) return { error: "unauthorized" };

  const userId = session.user.id;

  const [existing] = await db
    .select({ id: watchProgress.id })
    .from(watchProgress)
    .where(buildWhereClause(userId, input))
    .limit(1);

  if (existing) {
    await db
      .update(watchProgress)
      .set({
        currentTime: input.currentTime,
        duration: input.duration,
        percentage: input.percentage,
        title: input.title,
        posterPath: input.posterPath,
        releaseDate: input.releaseDate,
        completed: input.completed,
        lastWatchedAt: new Date(),
      })
      .where(eq(watchProgress.id, existing.id));
  } else {
    await db.insert(watchProgress).values({
      userId,
      tmdbId: input.tmdbId,
      mediaType: input.mediaType,
      season: input.season ?? null,
      episode: input.episode ?? null,
      currentTime: input.currentTime,
      duration: input.duration,
      percentage: Math.round(input.percentage),
      title: input.title,
      posterPath: input.posterPath,
      releaseDate: input.releaseDate,
      completed: input.completed,
    });
  }

  return { success: true };
}

export async function getAllWatchProgress() {
  const session = await auth();
  if (!session?.user?.id) return [];

  const entries = await db
    .select()
    .from(watchProgress)
    .where(eq(watchProgress.userId, session.user.id))
    .orderBy(watchProgress.lastWatchedAt);

  return entries;
}

export async function deleteWatchProgress(
  tmdbId: number,
  mediaType: MediaType,
  season?: number,
  episode?: number,
) {
  const session = await auth();
  if (!session?.user?.id) return { error: "unauthorized" };

  const seasonCondition =
    season != null
      ? eq(watchProgress.season, season)
      : isNull(watchProgress.season);

  const episodeCondition =
    episode != null
      ? eq(watchProgress.episode, episode)
      : isNull(watchProgress.episode);

  await db
    .delete(watchProgress)
    .where(
      and(
        eq(watchProgress.userId, session.user.id),
        eq(watchProgress.tmdbId, tmdbId),
        eq(watchProgress.mediaType, mediaType),
        seasonCondition,
        episodeCondition,
      ),
    );

  return { success: true };
}

export async function markWatchProgressCompleted(
  tmdbId: number,
  mediaType: MediaType,
  season?: number,
  episode?: number,
) {
  const session = await auth();
  if (!session?.user?.id) return { error: "unauthorized" };

  const seasonCondition =
    season != null
      ? eq(watchProgress.season, season)
      : isNull(watchProgress.season);

  const episodeCondition =
    episode != null
      ? eq(watchProgress.episode, episode)
      : isNull(watchProgress.episode);

  const [existing] = await db
    .select({ id: watchProgress.id })
    .from(watchProgress)
    .where(
      and(
        eq(watchProgress.userId, session.user.id),
        eq(watchProgress.tmdbId, tmdbId),
        eq(watchProgress.mediaType, mediaType),
        seasonCondition,
        episodeCondition,
      ),
    )
    .limit(1);

  if (existing) {
    await db
      .update(watchProgress)
      .set({
        percentage: 100,
        completed: true,
        lastWatchedAt: new Date(),
      })
      .where(eq(watchProgress.id, existing.id));
  }

  return { success: true };
}

export async function deleteAllWatchProgress() {
  const session = await auth();
  if (!session?.user?.id) return { error: "unauthorized" };

  await db
    .delete(watchProgress)
    .where(eq(watchProgress.userId, session.user.id));

  return { success: true };
}
