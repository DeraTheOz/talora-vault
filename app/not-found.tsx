import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-talora-dark-blue px-6 py-12 text-talora-white">
      <section
        aria-labelledby="not-found-title"
        className="w-full max-w-2xl rounded-2xl bg-talora-semi-dark-blue p-8 shadow-2xl md:p-12">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-talora-red">
          Archive entry missing
        </p>

        <h1
          id="not-found-title"
          className="mt-4 text-3xl font-medium leading-tight md:text-5xl">
          This title never made it into the vault.
        </h1>

        <p className="mt-5 max-w-xl text-talora-greyish-blue">
          The page may have been moved, the link may be incomplete, or this
          title or route is no longer in Talora&apos;s catalogue.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-lg bg-talora-red px-5 py-3 font-medium text-talora-white transition-colors hover:bg-talora-red/85 focus:outline-none focus:ring-2 focus:ring-talora-white focus:ring-offset-2 focus:ring-offset-talora-semi-dark-blue">
            Browse the vault
          </Link>

          <Link
            href="/movies"
            className="rounded-lg border border-talora-greyish-blue/60 px-5 py-3 font-medium transition-colors hover:border-talora-white hover:bg-talora-white/5 focus:outline-none focus:ring-2 focus:ring-talora-white focus:ring-offset-2 focus:ring-offset-talora-semi-dark-blue">
            Explore Titles
          </Link>
        </div>
      </section>
    </main>
  );
}
