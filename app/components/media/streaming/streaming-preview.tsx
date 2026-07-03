import Image, { type StaticImageData } from "next/image";
import { PlayCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface StreamingPreviewProps {
  title: string;
  image: StaticImageData;
  heading?: string;
  playLabel?: string;
  description?: string;
}

export default function StreamingPreview({
  title,
  image,
  heading = "Stream",
  playLabel,
  description = "Embed or redirect module will mount here during streaming integration.",
}: StreamingPreviewProps) {
  const accessiblePlayLabel = playLabel ?? `Play ${title} preview placeholder`;

  return (
    <section id="streaming-preview" aria-labelledby="streaming-title">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 id="streaming-title" className="text-2xl font-normal">
          {heading}
        </h2>
      </div>

      <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
        <Image
          src={image}
          alt=""
          fill
          placeholder="blur"
          sizes="(min-width: 1280px) 760px, 100vw"
          className="object-cover opacity-35"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
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
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
