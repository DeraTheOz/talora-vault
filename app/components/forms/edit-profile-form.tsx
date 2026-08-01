"use client";

import { Controller } from "react-hook-form";
import { useTranslations } from "next-intl";

import { useEditProfile } from "@/features/profile/hooks/use-edit-profile";
import type { UpdateProfileInput } from "@/features/profile/schemas/profile-schema";
import { languageOptions } from "@/i18n/config";
import CustomSelect from "./custom-select";
import FormError from "./form-error";

interface EditProfileFormProps {
  email: string;
  initialValues: UpdateProfileInput;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function EditProfileForm({
  email,
  initialValues,
  onCancel,
  onSuccess,
}: EditProfileFormProps) {
  const t = useTranslations("editProfile");
  const { form, isPending, onSubmit } = useEditProfile(initialValues, onSuccess);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const isDisabled = isSubmitting || isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 space-y-5">
      {/* Username */}
      <div className="space-y-1.5">
        <label htmlFor="username" className="block text-sm font-medium">
          {t("usernameLabel")}
        </label>
        <input
          id="username"
          type="text"
          autoComplete="username"
          placeholder={t("usernamePlaceholder")}
          disabled={isDisabled}
          aria-disabled={isDisabled}
          aria-invalid={Boolean(errors.username)}
          {...register("username")}
          className="w-full rounded-lg border border-talora-greyish-blue/30 bg-talora-dark-blue px-4 py-3 text-sm text-talora-white outline-none transition placeholder:text-talora-white/35 focus:border-talora-red disabled:cursor-not-allowed disabled:opacity-60"
        />
        {errors.username ? (
          <FormError errorMessage={errors.username.message} />
        ) : null}
      </div>

      {/* Bio */}
      <div className="space-y-1.5">
        <label htmlFor="bio" className="block text-sm font-medium">
          {t("bioLabel")}
          <span className="text-xs font-normal text-talora-white/40">
            {" "}
            ({t("bioHint")})
          </span>
        </label>
        <textarea
          id="bio"
          rows={3}
          placeholder={t("bioPlaceholder")}
          disabled={isDisabled}
          aria-disabled={isDisabled}
          aria-invalid={Boolean(errors.bio)}
          {...register("bio")}
          className="w-full resize-none rounded-lg border border-talora-greyish-blue/30 bg-talora-dark-blue px-4 py-3 text-sm text-talora-white outline-none transition placeholder:text-talora-white/35 focus:border-talora-red disabled:cursor-not-allowed disabled:opacity-60"
        />
        {errors.bio ? <FormError errorMessage={errors.bio.message} /> : null}
      </div>

      {/* Email (read-only) */}
      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-sm font-medium">
          {t("emailLabel")}
        </label>
        <input
          id="email"
          type="email"
          value={email}
          readOnly
          tabIndex={-1}
          aria-readonly="true"
          className="w-full cursor-not-allowed rounded-lg border border-talora-greyish-blue/30 bg-talora-dark-blue px-4 py-3 text-sm text-talora-white/60 outline-none"
        />
        <p className="text-xs text-talora-white/50">{t("emailHint")}</p>
      </div>

      {/* Language */}
      <div className="space-y-1.5">
        <label htmlFor="language" className="block text-sm font-medium">
          {t("languageLabel")}
        </label>
        <Controller
          name="language"
          control={control}
          render={({ field }) => (
            <CustomSelect
              id="language"
              name="language"
              options={languageOptions}
              value={field.value}
              onChange={(value) => field.onChange(value)}
              disabled={isDisabled}
              ariaLabel={t("languageLabel")}
            />
          )}
        />
        {errors.language ? (
          <FormError errorMessage={errors.language.message} />
        ) : null}
        <p className="text-xs text-talora-white/50">{t("languageHint")}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          disabled={isDisabled}
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg bg-talora-red px-6 text-sm font-medium text-talora-white cursor-pointer transition hover:bg-talora-red/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-talora-red active:scale-95 disabled:cursor-not-allowed disabled:opacity-60">
          {isDisabled ? t("saving") : t("updateButton")}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={isDisabled}
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg bg-talora-white/10 px-6 text-sm font-medium text-talora-white cursor-pointer transition hover:bg-talora-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-talora-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-60">
          {t("cancelButton")}
        </button>
      </div>
    </form>
  );
}
