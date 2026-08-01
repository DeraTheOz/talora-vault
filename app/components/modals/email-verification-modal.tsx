"use client";

import { useTranslations } from "next-intl";

interface EmailVerificationProps {
  email: string;
  isPending: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function EmailVerificationModal({
  email,
  isPending,
  onConfirm,
  onClose,
}: EmailVerificationProps) {
  const t = useTranslations("profile");
  const cancel = useTranslations("common");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="email-verification-title"
      className="fixed inset-0 z-50 grid place-items-center bg-talora-dark-blue/80 px-4 backdrop-blur-sm">
      <div className="w-full max-w-sm space-y-6 rounded-2xl bg-talora-semi-dark-blue p-6 text-talora-white shadow-2xl">
        <h2 id="email-verification-title" className="text-xl font-medium">
          {t("emailVerificationTitle")}
        </h2>

        <div className="flex items-center gap-2 mt-2">
          <p className="text-sm text-talora-white/60">
            {t("emailAddressLabel")}
          </p>
          <span className="max-w-fit text-sm p-1 text-talora-white/70 bg-talora-dark-blue rounded-sm">
            {email}
          </span>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg bg-talora-red px-6 text-sm font-medium text-talora-white cursor-pointer transition hover:bg-talora-red/85 disabled:opacity-50 disabled:cursor-not-allowed">
            {isPending ? t("verifying") : t("verifyEmail")}
          </button>

          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg bg-talora-white/10 px-6 text-sm font-medium text-talora-white cursor-pointer transition hover:bg-talora-white/15 disabled:opacity-50 disabled:cursor-not-allowed">
            {cancel("cancel")}
          </button>
        </div>
      </div>
    </div>
  );
}
