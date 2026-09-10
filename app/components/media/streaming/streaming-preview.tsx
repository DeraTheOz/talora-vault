import Image from "next/image";
import Link from "next/link";
import { PlayCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { getTranslations } from "next-intl/server";
import { getTmdbImageUrl } from "@/lib/tmdb/tmdb-image";

interface StreamingPreviewProps {
  title: string;
  imagePath: string | null;
  heading?: string;
  playLabel?: string;
  description?: string;
  loginUrl?: string;
}

export default async function StreamingPreview({
  title,
  imagePath,
  heading,
  playLabel,
  description,
  loginUrl,
}: StreamingPreviewProps) {
  const t = await getTranslations("detail");
  const accessiblePlayLabel =
    playLabel ?? t("playPreviewPlaceholder", { title });

  const imageUrl = imagePath ? getTmdbImageUrl(imagePath, "w780") : null;

  return (
    <section id="streaming-preview" aria-labelledby="streaming-title">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 id="streaming-title" className="text-2xl font-normal">
          {heading ?? t("streamMovie")}
        </h2>
      </div>

      <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={`${title} poster`}
            fill
            sizes="(min-width: 1280px) 760px, 100vw"
            className="object-cover opacity-35"
          />
        )}

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
          {loginUrl ? (
            <>
              <p className="max-w-sm px-6 text-sm text-talora-white/70">
                {t("loginToStreamDescription")}
              </p>

              <Link
                href={loginUrl}
                className="inline-flex min-h-11 items-center rounded-lg bg-talora-red px-6 text-sm font-medium text-talora-white transition hover:bg-talora-red/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-talora-white active:scale-95">
                {t("login")}
              </Link>
            </>
          ) : (
            <>
              <button
                type="button"
                aria-label={accessiblePlayLabel}
                className="inline-flex size-16 items-center justify-center rounded-full bg-talora-red text-talora-white transition hover:animate-pulse focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-talora-white active:scale-95">
                <HugeiconsIcon
                  icon={PlayCircleIcon}
                  size={32}
                  color="currentColor"
                />
              </button>

              <p className="max-w-sm px-6 text-sm text-talora-white/70">
                {description ?? t("streamingDescription")}
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
