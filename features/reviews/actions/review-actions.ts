"use server";

import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { getLocale, getTranslations } from "next-intl/server";

import { auth } from "@/auth";
import { db } from "@/db/client";
import { reviews } from "@/db/schema";
import {
  createReviewSchema,
  type ReviewInput,
} from "@/features/reviews/schemas/review-schema";
import { MediaType } from "@/features/media/types/media";

/**
 * Get an authenticated user's review for a movie/tv show
 */
export async function getReview(tmdbId: number, mediaType: MediaType) {
  const session = await auth();
  if (!session?.user?.id) return null;

  const [existingReview] = await db
    .select()
    .from(reviews)
    .where(
      and(
        eq(reviews.userId, session.user.id),
        eq(reviews.tmdbId, tmdbId),
        eq(reviews.mediaType, mediaType),
      ),
    )
    .limit(1);

  return existingReview || null;
}

/**
 * Save or Update a user's review
 */
export async function saveReview(input: ReviewInput) {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "detail" });
  const session = await auth();

  if (!session?.user?.id) {
    return {
      authRequired: true,
      error: t("loginToRateTitles"),
    };
  }

  const parsed = createReviewSchema(t).safeParse(input);

  if (!parsed.success) {
    return { error: t("invalidReviewInputs") };
  }

  const { tmdbId, mediaType, rating, content } = parsed.data;

  try {
    const [savedReview] = await db
      .insert(reviews)
      .values({
        userId: session.user.id,
        tmdbId,
        mediaType,
        rating,
        content,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: [reviews.userId, reviews.mediaType, reviews.tmdbId],
        set: {
          rating,
          content,
          updatedAt: new Date(),
        },
      })
      .returning();

    revalidatePath(`/${mediaType === "movie" ? "movies" : "series"}/${tmdbId}`);
    return { success: true, review: savedReview };
  } catch (err) {
    console.error("Failed to save review:", err);
    return { error: t("failedToSaveReview") };
  }
}

/**
 * Delete a user's review
 */
export async function deleteReview(tmdbId: number, mediaType: MediaType) {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "detail" });
  const session = await auth();

  if (!session?.user?.id) {
    return {
      authRequired: true,
      error: t("loginToManageReviews"),
    };
  }

  try {
    await db
      .delete(reviews)
      .where(
        and(
          eq(reviews.userId, session.user.id),
          eq(reviews.tmdbId, tmdbId),
          eq(reviews.mediaType, mediaType),
        ),
      );

    revalidatePath(`/${mediaType === "movie" ? "movies" : "series"}/${tmdbId}`);
    return { success: true };
  } catch (err) {
    console.error("Failed to delete review:", err);
    return { error: t("failedToDeleteReview") };
  }
}
