"use server";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { getTranslations } from "next-intl/server";

import { auth } from "@/auth";
import { db } from "@/db/client";
import { users } from "@/db/schema";
import {
  createChangePasswordSchema,
  type ChangePasswordInput,
} from "@/features/profile/schemas/change-password-schema";

export type ChangePasswordActionState = {
  error?: string;
  success?: boolean;
};

/**
 * Server Action for changing the signed-in user's password.
 * Requires the current password and stores the new one hashed.
 */
export async function changePasswordAction(
  input: ChangePasswordInput,
): Promise<ChangePasswordActionState> {
  const t = await getTranslations("changePassword.errors");

  const parsed = createChangePasswordSchema((key) => t(key)).safeParse(input);

  if (!parsed.success) {
    return { error: t("invalid") };
  }

  const session = await auth();
  if (!session?.user?.id) {
    return { error: t("notAuthenticated") };
  }

  const [user] = await db
    .select({ passwordHash: users.passwordHash })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);

  if (!user?.passwordHash) {
    return { error: t("noPassword") };
  }

  const currentPasswordIsValid = await bcrypt.compare(
    parsed.data.currentPassword,
    user.passwordHash,
  );

  if (!currentPasswordIsValid) {
    return { error: t("currentPasswordIncorrect") };
  }

  try {
    const passwordHash = await bcrypt.hash(parsed.data.newPassword, 12);

    await db
      .update(users)
      .set({ passwordHash, updatedAt: new Date() })
      .where(eq(users.id, session.user.id));

    return { success: true };
  } catch (err) {
    console.error("Failed to change password:", err);
    return { error: t("updateFailed") };
  }
}
