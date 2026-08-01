"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

import { auth } from "@/auth";
import { db } from "@/db/client";
import { users } from "@/db/schema";
import { Avatar, Style } from "@dicebear/core";
import toonHead from "@dicebear/styles/toon-head.json";
import lorelei from "@dicebear/styles/lorelei.json";
import adventurer from "@dicebear/styles/adventurer.json";
import micah from "@dicebear/styles/micah.json";
import miniavs from "@dicebear/styles/miniavs.json";
import notionists from "@dicebear/styles/notionists.json";
import openPeeps from "@dicebear/styles/open-peeps.json";
import bottts from "@dicebear/styles/bottts.json";
import {
  createUpdateProfileSchema,
  type UpdateProfileInput,
} from "@/features/profile/schemas/profile-schema";
import { isLocale, localeCookieName } from "@/i18n/config";

export async function verifyEmailAction() {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "You must be logged in to verify your email." };
  }

  try {
    await db
      .update(users)
      .set({ emailVerified: new Date() })
      .where(eq(users.id, session.user.id));

    revalidatePath("/profile");
    return { success: true };
  } catch (err) {
    console.error("Failed to verify email:", err);
    return { error: "Failed to verify your email. Please try again." };
  }
}

export async function regenerateAvatarAction() {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Not authenticated" };
  }

  const seed = crypto.randomUUID();
  const styles = [
    toonHead,
    lorelei,
    adventurer,
    micah,
    miniavs,
    notionists,
    openPeeps,
    bottts,
  ];
  const style = new Style(styles[Math.floor(Math.random() * styles.length)]);
  const avatar = new Avatar(style, {
    seed,
    size: 128,
  }).toDataUri();

  await db
    .update(users)
    .set({ image: avatar })
    .where(eq(users.id, session.user.id));
  revalidatePath("/profile");
  return { success: true };
}

/**
 * Updates the signed-in user's profile (name, bio, preferred language).
 * When the language changes, it also becomes the active app locale for this
 * browser by being persisted in the `locale` cookie.
 */
export async function updateProfileAction(input: UpdateProfileInput) {
  const t = await getTranslations("editProfile.errors");

  const parsed = createUpdateProfileSchema((key) => t(key)).safeParse(input);

  if (!parsed.success) {
    return { error: t("invalid") };
  }

  const session = await auth();
  if (!session?.user?.id) {
    return { error: t("notAuthenticated") };
  }

  const { username, bio, language } = parsed.data;

  try {
    await db
      .update(users)
      .set({
        name: username,
        bio: bio || null,
        language,
        updatedAt: new Date(),
      })
      .where(eq(users.id, session.user.id));

    if (isLocale(language)) {
      const store = await cookies();
      store.set(localeCookieName, language, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });
    }

    revalidatePath("/profile");
    return { success: true };
  } catch (err) {
    console.error("Failed to update profile:", err);
    return { error: t("updateFailed") };
  }
}
