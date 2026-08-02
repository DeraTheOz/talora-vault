"use client";

import { useTranslations } from "next-intl";
import { HugeiconsIcon } from "@hugeicons/react";
import { LockPasswordIcon } from "@hugeicons/core-free-icons";
import PasswordChangeForm from "../forms/password-change-form";

export default function ChangePassword() {
  const t = useTranslations("changePassword");

  return (
    <section
      aria-label={t("title")}
      className="rounded-xl bg-talora-semi-dark-blue p-5 md:p-6 max-w-max">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-talora-white/10">
          <HugeiconsIcon icon={LockPasswordIcon} size={18} />
        </span>
        <div className="space-y-1">
          <h3 className="text-md font-medium">{t("title")}</h3>
          <p className="text-sm text-talora-white/60">{t("description")}</p>
        </div>
      </div>

      <PasswordChangeForm />
    </section>
  );
}
