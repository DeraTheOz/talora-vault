"use client";

import { useTranslations } from "next-intl";
import { HugeiconsIcon } from "@hugeicons/react";
import { LockPasswordIcon } from "@hugeicons/core-free-icons";

import { useChangePassword } from "@/features/profile/hooks/use-change-password";
import FormError from "../forms/form-error";

export default function ChangePassword() {
  const t = useTranslations("changePassword");
  const { form, onSubmit } = useChangePassword();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const isDisabled = isSubmitting;

  const inputClassName =
    "w-full rounded-lg border border-talora-greyish-blue/30 bg-talora-dark-blue px-4 py-3 text-sm text-talora-white outline-none transition placeholder:text-talora-white/35 focus:border-talora-red disabled:cursor-not-allowed disabled:opacity-60";

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

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-5 max-w-md space-y-5">
        {/* Current password */}
        <div className="space-y-1.5">
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium">
            {t("currentPasswordLabel")}
          </label>
          <input
            id="currentPassword"
            type="password"
            autoComplete="current-password"
            placeholder={t("currentPasswordPlaceholder")}
            disabled={isDisabled}
            aria-disabled={isDisabled}
            aria-invalid={Boolean(errors.currentPassword)}
            {...register("currentPassword")}
            className={inputClassName}
          />
          {errors.currentPassword ? (
            <FormError errorMessage={errors.currentPassword.message} />
          ) : null}
        </div>

        {/* New password */}
        <div className="space-y-1.5">
          <label htmlFor="newPassword" className="block text-sm font-medium">
            {t("newPasswordLabel")}
            <span className="text-xs font-normal text-talora-white/40">
              {" "}
              ({t("newPasswordHint")})
            </span>
          </label>
          <input
            id="newPassword"
            type="password"
            autoComplete="new-password"
            placeholder={t("newPasswordPlaceholder")}
            disabled={isDisabled}
            aria-disabled={isDisabled}
            aria-invalid={Boolean(errors.newPassword)}
            {...register("newPassword")}
            className={inputClassName}
          />
          {errors.newPassword ? (
            <FormError errorMessage={errors.newPassword.message} />
          ) : null}
        </div>

        {/* Confirm new password */}
        <div className="space-y-1.5">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium">
            {t("confirmPasswordLabel")}
          </label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder={t("confirmPasswordPlaceholder")}
            disabled={isDisabled}
            aria-disabled={isDisabled}
            aria-invalid={Boolean(errors.confirmPassword)}
            {...register("confirmPassword")}
            className={inputClassName}
          />
          {errors.confirmPassword ? (
            <FormError errorMessage={errors.confirmPassword.message} />
          ) : null}
        </div>

        {/* Actions */}
        <div className="pt-1">
          <button
            type="submit"
            disabled={isDisabled}
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-talora-red px-6 text-sm font-medium text-talora-white cursor-pointer transition hover:bg-talora-red/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-talora-red active:scale-95 disabled:cursor-not-allowed disabled:opacity-60">
            {isDisabled ? t("saving") : t("updateButton")}
          </button>
        </div>
      </form>
    </section>
  );
}
