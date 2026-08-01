import { getTranslations } from "next-intl/server";
import { Delete02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default async function DeleteAccount() {
  const t = await getTranslations("profile");

  return (
    <section
      aria-label={t("deleteAccount")}
      className="rounded-xl bg-talora-semi-dark-blue p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex flex-col gap-2">
          <h3 className="text-md font-medium text-talora-red">
            {t("deleteAccount")}
          </h3>
          <p className="text-xs text-talora-red">
            {t("deleteAccountDescription")}
          </p>
        </div>

        <button
          type="button"
          aria-label={t("delete")}
          className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg bg-talora-red/15 px-5 text-sm font-medium text-talora-red cursor-pointer transition hover:bg-talora-red/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-talora-red active:scale-95">
          <HugeiconsIcon icon={Delete02Icon} size={18} />
          {t("delete")}
        </button>
      </div>
    </section>
  );
}
