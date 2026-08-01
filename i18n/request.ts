import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";

import { auth } from "@/auth";
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  locales,
} from "./config";

function getLocaleFromAcceptLanguage(header: string | null): string | null {
  if (!header) return null;

  const accepted = header
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase());

  const supported = new Set<string>(locales);

  for (const lang of accepted) {
    if (supported.has(lang)) return lang;
    const base = lang.split("-")[0];
    if (supported.has(base)) return base;
  }

  return null;
}

export default getRequestConfig(async () => {
  const store = await cookies();
  const cookieLocale = store.get(localeCookieName)?.value;

  if (isLocale(cookieLocale)) {
    return {
      locale: cookieLocale,
      messages: (await import(`../messages/${cookieLocale}.json`)).default,
    };
  }

  // Signed-in users without a locale cookie fall back to their saved preference.
  const session = await auth();
  if (isLocale(session?.user?.locale)) {
    return {
      locale: session.user.locale,
      messages: (await import(`../messages/${session.user.locale}.json`))
        .default,
    };
  }

  // Logged-out users fall back to their browser language, then the default.
  const headerList = await headers();
  const acceptLanguage = getLocaleFromAcceptLanguage(
    headerList.get("accept-language"),
  );
  const locale = isLocale(acceptLanguage) ? acceptLanguage : defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
