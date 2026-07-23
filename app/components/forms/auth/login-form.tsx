"use client";

import AuthField from "./auth-field";
import AuthGoogleButton from "./auth-google-button";
import AuthSubmitButton from "./auth-submit-button";
import AuthSwitchLink from "./auth-switch-link";
import FormError from "../form-error";
import { useLogin } from "@/features/auth/hooks/use-login";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
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
            label="Email address"
            type="email"
            autoComplete="email"
            placeholder="Email address"
            disabled={isPending}
            aria-disabled={isPending}
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          {errors.email ? (
            <FormError errorMessage={errors.email.message} />
          ) : null}

          <AuthField
            label="Password"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
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
            ? "Logging in..."
            : "Login to your account"}
        </AuthSubmitButton>

        <AuthGoogleButton disabled={isPending} onClick={onGoogleClick}>
          {isGooglePending ? "Opening Google..." : "Continue with Google"}
        </AuthGoogleButton>
      </form>

      <AuthSwitchLink
        prompt="Don't have an account?"
        href={signupHref}
        label="Sign Up"
      />
    </>
  );
}
