import Link from "next/link";

export default function SeriesNotFound() {
  return (
    <section
      aria-labelledby="series-not-found-title"
      className="mx-auto mt-10 max-w-2xl rounded-2xl bg-talora-semi-dark-blue p-8 text-talora-white">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-talora-red">
        Tv series unavailable
      </p>

      <h1
        id="series-not-found-title"
        className="mt-4 text-3xl font-medium leading-tight">
        This tv series could not be found in the vault.
      </h1>

      <p className="mt-4 text-talora-greyish-blue">
        The tv series may have been removed from the catalogue, or this link no
        longer points to a recognized show.
      </p>

      <Link
        href="/series"
        className="mt-7 inline-flex rounded-lg bg-talora-red px-5 py-3 font-medium transition-colors hover:bg-talora-red/85">
        Discover series
      </Link>
    </section>
  );
}
