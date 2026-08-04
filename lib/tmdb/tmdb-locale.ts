import type { Locale } from "@/i18n/config";

const tmdbLocaleMap: Record<Locale, string> = {
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
};

export const defaultTmdbLocale = "en-US";

export function toTmdbLocale(locale: string): string {
  return tmdbLocaleMap[locale as Locale] ?? defaultTmdbLocale;
}
