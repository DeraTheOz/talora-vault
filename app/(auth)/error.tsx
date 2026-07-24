"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function AuthError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
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
        Access interrupted
      </p>

      <h1
        id="auth-error-title"
        className="mt-4 text-3xl font-medium leading-tight text-talora-white">
        Your pass to the vault could not be checked.
      </h1>

      <p className="mt-4 text-talora-greyish-blue">
        This is a temporary problem with the sign-in experience. Your account
        has not been changed.
      </p>

      <div className="mt-7 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={unstable_retry}
          className="rounded-lg bg-talora-red px-5 py-3 font-medium text-talora-white cursor-pointer transition-colors hover:bg-talora-red/85">
          Try again
        </button>

        <Link
          href="/"
          className="rounded-lg border border-talora-greyish-blue/60 px-5 py-3 font-medium text-talora-white transition-colors hover:border-talora-white">
          Back to discovery
        </Link>
      </div>
    </section>
  );
}
