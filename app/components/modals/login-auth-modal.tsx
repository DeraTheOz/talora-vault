import Link from "next/link";

interface LoginAuthModalProps {
  titleId: string;
  title: string;
  description: string;
  href: string;
  onClose: () => void;
  primaryButtonText: string;
  secondaryButtonText: string;
}

export default function LoginAuthModal({
  titleId,
  title,
  description,
  href,
  onClose,
  primaryButtonText,
  secondaryButtonText,
}: LoginAuthModalProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="bookmark-auth-title"
      className="fixed inset-0 z-50 grid place-items-center bg-talora-dark-blue/80 px-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-talora-semi-dark-blue p-6 text-talora-white shadow-2xl">
        <h2 id={titleId} className="text-xl font-medium">
          {title}
        </h2>

        <p className="mt-2 text-sm text-talora-white/70">{description}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={href}
            className="inline-flex min-h-11 items-center rounded-lg bg-talora-red px-6 text-sm font-medium text-talora-white transition hover:bg-talora-red/85">
            {primaryButtonText}
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 items-center rounded-lg bg-talora-white/10 px-6 text-sm font-medium text-talora-white cursor-pointer transition hover:bg-talora-white/15">
            {secondaryButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}
