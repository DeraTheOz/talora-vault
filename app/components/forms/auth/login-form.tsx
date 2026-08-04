"use client";

import AuthField from "./auth-field";
import AuthGoogleButton from "./auth-google-button";
import AuthSubmitButton from "./auth-submit-button";
import AuthSwitchLink from "./auth-switch-link";
import FormError from "../form-error";
import { useLogin } from "@/features/auth/hooks/use-login";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const t = useTranslations("auth");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const signupHref = callbackUrl
    ? `/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`
    : "/signup";

  const {
    form,
    isGooglePending,
    isNavigating,
    displayedError,
    onSubmit,
    onGoogleClick,
  } = useLogin();

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
            autoComplete="current-password"
            placeholder={t("password")}
            disabled={isPending}
            aria-disabled={isPending}
            aria-invalid={Boolean(errors.password)}
            {...register("password")}
          />
          {errors.password ? (
            <FormError errorMessage={errors.password.message} />
          ) : null}
        </div>

        {displayedError ? <FormError errorMessage={displayedError} /> : null}

        <AuthSubmitButton disabled={isPending}>
          {isSubmitting || isNavigating
            ? t("loggingIn")
            : t("loginToYourAccount")}
        </AuthSubmitButton>

        <AuthGoogleButton disabled={isPending} onClick={onGoogleClick}>
          {isGooglePending ? t("openingGoogle") : t("continueWithGoogle")}
        </AuthGoogleButton>
      </form>

      <AuthSwitchLink
        prompt={t("dontHaveAccount")}
        href={signupHref}
        label={t("signUpLink")}
      />
    </>
  );
}
