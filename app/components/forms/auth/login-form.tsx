"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  loginSchema,
  type LoginInput,
} from "@/features/auth/schemas/auth-schema";
import {
  googleSignInAction,
  loginAction,
} from "@/features/auth/actions/auth-actions";

import AuthField from "./auth-field";
import AuthGoogleButton from "./auth-google-button";
import AuthSubmitButton from "./auth-submit-button";
import AuthSwitchLink from "./auth-switch-link";
import FormError from "../form-error";

const authErrors: Record<string, string> = {
  OAuthAccountNotLinked:
    "An account with this email already exists. Sign in using your email and password.",
};

export default function LoginForm() {
  const [formError, setFormError] = useState<string | null>(null);
  const [isGooglePending, startGoogleTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();

  const displayedError =
    formError ??
    (searchParams.get("error")
      ? (authErrors[searchParams.get("error")!] ?? null)
      : null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginInput) {
    setFormError(null);

    const result = await loginAction(values);

    if (result?.error) {
      setFormError(result.error);
      toast.error(result.error);
    } else if (result?.success) {
      toast.success(`Welcome back, ${result.username || "User"}`);
      router.push("/");
      router.refresh();
    }
  }

  function onGoogleClick() {
    startGoogleTransition(() => {
      void googleSignInAction();
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <AuthField
            label="Email address"
            type="email"
            autoComplete="email"
            placeholder="Email address"
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
            aria-invalid={Boolean(errors.password)}
            {...register("password")}
          />
          {errors.password ? (
            <FormError errorMessage={errors.password.message} />
          ) : null}
        </div>

        {displayedError ? <FormError errorMessage={displayedError} /> : null}

        <AuthSubmitButton disabled={isSubmitting || isGooglePending}>
          {isSubmitting ? "Logging in..." : "Login to your account"}
        </AuthSubmitButton>

        <AuthGoogleButton
          disabled={isSubmitting || isGooglePending}
          onClick={onGoogleClick}>
          {isGooglePending ? "Opening Google..." : "Continue with Google"}
        </AuthGoogleButton>
      </form>

      <AuthSwitchLink
        prompt="Don't have an account?"
        href="/signup"
        label="Sign Up"
      />
    </>
  );
}
