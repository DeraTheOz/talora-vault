"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { and, eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { getLocale, getTranslations } from "next-intl/server";

import { Avatar, Style } from "@dicebear/core";
import toonHead from "@dicebear/styles/toon-head.json";

import { signIn, signOut } from "@/auth";
import { db } from "@/db/client";
import { accounts, users } from "@/db/schema/auth";
import {
  createLoginSchema,
  createSignupSchema,
  type LoginInput,
  type SignupInput,
} from "@/features/auth/schemas/auth-schema";
import { isLocale, localeCookieName } from "@/i18n/config";

export type AuthActionState = {
  error?: string;
  success?: boolean;
  username?: string;
  callbackUrl?: string;
};

/**
 * Server Action for creating a new user account.
 * We do not sign the user in automatically, allowing the client to redirect them to the login page
 */
export async function signupAction(
  input: SignupInput,
): Promise<AuthActionState> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "auth" });
  const signupSchema = createSignupSchema(t);
  const parsed = signupSchema.safeParse(input);

  if (!parsed.success) {
    return { error: t("checkSignupDetails") };
  }

  // Get existing user
  const [existingUser] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, parsed.data.email))
    .limit(1);

  if (existingUser) {
    // Check if existing user signed up with google
    const [googleAccount] = await db
      .select()
      .from(accounts)
      .where(
        and(
          eq(accounts.userId, existingUser.id),
          eq(accounts.provider, "google"),
        ),
      )
      .limit(1);

    if (googleAccount) {
      return {
        error: t("emailRegisteredWithGoogle"),
      };
    }

    return {
      error: t("accountAlreadyExists"),
    };
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  const avatar = new Avatar(new Style(toonHead), {
    seed: parsed.data.username,
    size: 32,
  }).toDataUri();

  await db.insert(users).values({
    name: parsed.data.username,
    email: parsed.data.email,
    passwordHash,
    image: avatar,
  });

  return { success: true };
}

/**
 * Server Action for logging in a user.
 * We set `redirect: false` so that we can show a "Welcome back!" toast before directing the user home.
 */
export async function loginAction(
  input: LoginInput,
  callbackUrl: string,
): Promise<AuthActionState> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "auth" });
  const loginSchema = createLoginSchema(t);
  const parsed = loginSchema.safeParse(input);

  if (!parsed.success) {
    return { error: t("enterValidEmailPassword") };
  }

  // Get existing user
  const [user] = await db
    .select({
      id: users.id,
      name: users.name,
      language: users.language,
      passwordHash: users.passwordHash,
    })
    .from(users)
    .where(eq(users.email, parsed.data.email))
    .limit(1);

  // User exists but has no password, meaning they likely signed up via Google
  if (user && !user.passwordHash) {
    const [googleAccount] = await db
      .select()
      .from(accounts)
      .where(and(eq(accounts.userId, user.id), eq(accounts.provider, "google")))
      .limit(1);

    if (googleAccount) {
      return {
        error: t("accountCreatedWithGoogle"),
      };
    }
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    });

    // Make the user's preferred language the active app locale for this browser.
    if (isLocale(user?.language)) {
      const store = await cookies();
      store.set(localeCookieName, user.language, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });
    }

    return {
      success: true,
      username: user?.name || undefined,
      callbackUrl,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: t("invalidEmailOrPassword") };
    }

    throw error;
  }
}

export async function googleSignInAction(redirectTo?: string) {
  await signIn("google", {
    redirectTo: redirectTo || "/",
  });
}

export async function logoutAction() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "auth" });

  try {
    await signOut({
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: t("logoutFailed") };
    }

    throw error;
  }
}
