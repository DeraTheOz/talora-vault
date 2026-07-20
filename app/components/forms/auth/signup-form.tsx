"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  signupSchema,
  type SignupInput,
} from "@/features/auth/schemas/auth-schema";
import {
  googleSignInAction,
  signupAction,
} from "@/features/auth/actions/auth-actions";
import { toastStyles } from "@/lib/constants/toast";

import AuthField from "./auth-field";
import AuthGoogleButton from "./auth-google-button";
import AuthSubmitButton from "./auth-submit-button";
import AuthSwitchLink from "./auth-switch-link";
import FormError from "../form-error";

export default function SignupForm() {
  const [formError, setFormError] = useState<string | null>(null);
  const [isGooglePending, startGoogleTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignupInput) {
    setFormError(null);

    const result = await signupAction(values);

    if (result?.error) {
      setFormError(result.error);
      toast.error(result.error, { id: "signup-error", ...toastStyles.error });
    } else if (result?.success) {
      // Toast success and redirect the user to the login page
      toast.success("Account created successfully!");
      router.push("/login");
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
            label="Username"
            type="text"
            autoComplete="username"
            placeholder="Username"
            aria-invalid={Boolean(errors.username)}
            {...register("username")}
          />
          {errors.username ? (
            <FormError errorMessage={errors.username.message} />
          ) : null}

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
            autoComplete="new-password"
            placeholder="Password"
            aria-invalid={Boolean(errors.password)}
            {...register("password")}
          />
          {errors.password ? (
            <FormError errorMessage={errors.password.message} />
          ) : null}

          <AuthField
            label="Repeat password"
            type="password"
            autoComplete="new-password"
            placeholder="Repeat password"
            aria-invalid={Boolean(errors.confirmPassword)}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword ? (
            <FormError errorMessage={errors.confirmPassword.message} />
          ) : null}
        </div>

        {formError ? <FormError errorMessage={formError} /> : null}

        <AuthSubmitButton disabled={isSubmitting || isGooglePending}>
          {isSubmitting ? "Creating account..." : "Create an account"}
        </AuthSubmitButton>

        <AuthGoogleButton
          disabled={isSubmitting || isGooglePending}
          onClick={onGoogleClick}>
          {isGooglePending ? "Opening Google..." : "Continue with Google"}
        </AuthGoogleButton>
      </form>

      <AuthSwitchLink
        prompt="Already have an account?"
        href="/login"
        label="Login"
      />
    </>
  );
}
