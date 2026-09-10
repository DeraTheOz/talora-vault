import { useTranslations } from "next-intl";

interface ClearHistoryModalProps {
  isPending: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ClearHistoryModal({
  isPending,
  onClose,
  onConfirm,
}: ClearHistoryModalProps) {
  const t = useTranslations("watchHistory");
  const commonT = useTranslations("common");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="clear-history-title"
      className="fixed inset-0 z-50 grid place-items-center bg-talora-dark-blue/80 px-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-talora-semi-dark-blue p-6 text-talora-white shadow-2xl">
        <h2 id="clear-history-title" className="text-xl font-medium">
          {t("clearHistoryConfirmTitle")}
        </h2>
        <p className="mt-2 text-sm text-talora-white/70">
          {t("clearHistoryConfirmDescription")}
        </p>
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="inline-flex min-h-10 items-center rounded-lg bg-talora-white/10 px-5 text-sm font-medium text-talora-white cursor-pointer transition hover:bg-talora-white/15 disabled:cursor-not-allowed">
            {commonT("cancel")}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className="inline-flex min-h-10 items-center rounded-lg bg-talora-red px-5 text-sm font-medium text-talora-white cursor-pointer transition hover:bg-talora-red/85 disabled:cursor-not-allowed">
            {isPending ? t("clearing") : t("clearHistory")}
          </button>
        </div>
      </div>
    </div>
  );
}
