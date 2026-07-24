"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function RootError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("Talora Vault route error:", {
      digest: error.digest,
      error,
    });
  }, [error]);

  return (
    <main className="grid min-h-dvh place-items-center bg-talora-dark-blue px-6 py-12 text-talora-white">
      <section
        aria-labelledby="vault-error-title"
        className="w-full max-w-2xl rounded-2xl bg-talora-semi-dark-blue p-8 shadow-2xl md:p-12">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-talora-red">
          Vault interruption
        </p>

        <h1
          id="vault-error-title"
          className="mt-4 text-3xl font-medium leading-tight md:text-5xl">
          The screening room lost its signal.
        </h1>

        <p className="mt-5 max-w-xl text-talora-greyish-blue">
          Talora Vault could not load this part of the experience. The title may
          still be here, our connection to it just stumbled.
        </p>

        {error.digest && (
          <p className="mt-5 text-xs text-talora-greyish-blue">
            Incident reference: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={unstable_retry}
            className="rounded-lg bg-talora-red px-5 py-3 font-medium text-talora-white transition-colors cursor-pointer hover:bg-talora-red/85 focus:outline-none focus:ring-2 focus:ring-talora-white focus:ring-offset-2 focus:ring-offset-talora-semi-dark-blue">
            Restore the signal
          </button>

          <Link
            href="/"
            className="rounded-lg border border-talora-greyish-blue/60 px-5 py-3 font-medium transition-colors hover:border-talora-white hover:bg-talora-white/5 focus:outline-none focus:ring-2 focus:ring-talora-white focus:ring-offset-2 focus:ring-offset-talora-semi-dark-blue">
            Return to discovery
          </Link>
        </div>
      </section>
    </main>
  );
}
