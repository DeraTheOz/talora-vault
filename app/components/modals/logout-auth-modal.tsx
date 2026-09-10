"use client";

import { useTranslations } from "next-intl";

interface LogoutAuthProps {
  isPending: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function LogoutAuthModal({
  isPending,
  onConfirm,
  onCancel,
}: LogoutAuthProps) {
  const t = useTranslations("navigation");
  const cancel = useTranslations("common");

  return (
    <div
      data-talora-overlay
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-confirm-title"
      className="fixed inset-0 z-50 grid place-items-center bg-talora-dark-blue/80 px-4 backdrop-blur-sm">
      <div
        data-talora-modal
        className="w-full max-w-sm rounded-2xl bg-talora-semi-dark-blue p-6 text-talora-white shadow-2xl">
        <h2 id="logout-confirm-title" className="text-xl font-medium">
          {t("logOutConfirm")}
        </h2>

        <p className="mt-2 text-sm text-talora-white/70">
          {t("logOutDescription")}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg bg-talora-red px-6 text-sm font-medium text-talora-white cursor-pointer transition hover:bg-talora-red/85 disabled:opacity-50 disabled:cursor-not-allowed">
            {isPending ? t("loggingOut") : t("logOut")}
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg bg-talora-white/10 px-6 text-sm font-medium text-talora-white cursor-pointer transition hover:bg-talora-white/15 disabled:opacity-50 disabled:cursor-not-allowed">
            {cancel("cancel")}
          </button>
        </div>
      </div>
    </div>
  );
}
