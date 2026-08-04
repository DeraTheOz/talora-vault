"use client";

import AuthField from "./auth-field";
import AuthGoogleButton from "./auth-google-button";
import AuthSubmitButton from "./auth-submit-button";
import AuthSwitchLink from "./auth-switch-link";
import FormError from "../form-error";
import { useSignup } from "@/features/auth/hooks/use-signup";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

export default function SignupForm() {
  const t = useTranslations("auth");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const loginHref = callbackUrl
    ? `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`
    : "/login";

  const {
    form,
    formError,
    isGooglePending,
    isNavigating,
    onSubmit,
    onGoogleClick,
  } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const isPending = isSubmitting || isGooglePending || isNavigating;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-3">
          <AuthField
            label={t("username")}
            type="text"
            autoComplete="username"
            placeholder={t("username")}
            disabled={isPending}
            aria-disabled={isPending}
            aria-invalid={Boolean(errors.username)}
            {...register("username")}
          />
          {errors.username ? (
            <FormError errorMessage={errors.username.message} />
          ) : null}

          <AuthField
            label={t("emailAddress")}
            type="email"
            autoComplete="email"
            placeholder={t("emailAddress")}
            disabled={isPending}
            aria-disabled={isPending}
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          {errors.email ? (
            <FormError errorMessage={errors.email.message} />
          ) : null}

          <AuthField
            label={t("password")}
            type="password"
            autoComplete="new-password"
            placeholder={t("password")}
            disabled={isPending}
            aria-disabled={isPending}
            aria-invalid={Boolean(errors.password)}
            {...register("password")}
          />
          {errors.password ? (
            <FormError errorMessage={errors.password.message} />
          ) : null}

          <AuthField
            label={t("repeatPassword")}
            type="password"
            autoComplete="new-password"
            placeholder={t("repeatPassword")}
            disabled={isPending}
            aria-disabled={isPending}
            aria-invalid={Boolean(errors.confirmPassword)}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword ? (
            <FormError errorMessage={errors.confirmPassword.message} />
          ) : null}
        </div>

        {formError ? <FormError errorMessage={formError} /> : null}

        <AuthSubmitButton disabled={isPending}>
          {isSubmitting || isNavigating
            ? t("creatingAccount")
            : t("createAnAccount")}
        </AuthSubmitButton>

        <AuthGoogleButton disabled={isPending} onClick={onGoogleClick}>
          {isGooglePending ? t("openingGoogle") : t("continueWithGoogle")}
        </AuthGoogleButton>
      </form>

      <AuthSwitchLink
        prompt={t("alreadyHaveAccount")}
        href={loginHref}
        label={t("login")}
      />
    </>
  );
}
