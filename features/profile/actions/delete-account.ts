"use server";

import { auth, signOut } from "@/auth";
import { db } from "@/db/client";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function deleteAccountAction({
  confirmInput,
  authProvider,
}: {
  confirmInput: string;
  authProvider: "google" | "credentials";
}) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);

  if (!user) {
    return { success: false, error: "User not found" };
  }

  if (authProvider === "credentials") {
    if (!user.passwordHash) {
      return { success: false, error: "Invalid credentials" };
    }

    const passwordsMatch = await bcrypt.compare(
      confirmInput,
      user.passwordHash,
    );
    if (!passwordsMatch) {
      return { success: false, error: "Incorrect password." };
    }
  } else if (authProvider === "google") {
    if (confirmInput !== session.user.email) {
      return { success: false, error: "Email confirmation does not match." };
    }
  }

  await db.delete(users).where(eq(users.id, session.user.id));
  await signOut({ redirect: false });

  return { success: true };
}
