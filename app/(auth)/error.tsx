"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function AuthError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  const t = useTranslations("auth");

  useEffect(() => {
    console.error("Talora Vault authentication route error:", {
      digest: error.digest,
      error,
    });
  }, [error]);

  return (
    <section
      aria-labelledby="auth-error-title"
      className="w-full rounded-2xl bg-talora-semi-dark-blue p-7 shadow-xl md:p-8">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-talora-red">
        {t("accessInterrupted")}
      </p>

      <h1
        id="auth-error-title"
        className="mt-4 text-3xl font-medium leading-tight text-talora-white">
        {t("authErrorTitle")}
      </h1>

      <p className="mt-4 text-talora-greyish-blue">
        {t("authErrorDescription")}
      </p>

      <div className="mt-7 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={unstable_retry}
          className="rounded-lg bg-talora-red px-5 py-3 font-medium text-talora-white cursor-pointer transition-colors hover:bg-talora-red/85">
          {t("tryAgain")}
        </button>

        <Link
          href="/"
          className="rounded-lg border border-talora-greyish-blue/60 px-5 py-3 font-medium text-talora-white transition-colors hover:border-talora-white">
          {t("backToDiscovery")}
        </Link>
      </div>
    </section>
  );
}
