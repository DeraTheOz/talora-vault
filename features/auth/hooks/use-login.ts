"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginInput } from "../schemas/auth-schema";
import { googleSignInAction, loginAction } from "../actions/auth-actions";
import { toast } from "sonner";

const authErrors: Record<string, string> = {
  OAuthAccountNotLinked:
    "An account with this email already exists. Sign in using your email and password.",
};

export function useLogin() {
  const [formError, setFormError] = useState<string | null>(null);
  const [isGooglePending, startGoogleTransition] = useTransition();
  const [isNavigating, startNavigationTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();

  const displayedError =
    formError ??
    (searchParams.get("error")
      ? (authErrors[searchParams.get("error")!] ?? null)
      : null);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginInput) {
    setFormError(null);
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const result = await loginAction(values, callbackUrl);

    if (result?.error) {
      setFormError(result.error);
      toast.error(result.error);
    } else if (result?.success) {
      // Hold navigation transition & defer toast until new page renders
      startNavigationTransition(() => {
        router.push(`${result.callbackUrl}`);
        router.refresh();
        toast.success(`Welcome back, ${result.username || "User"}`);
      });
    }
  }

  function onGoogleClick() {
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    startGoogleTransition(() => {
      void googleSignInAction(callbackUrl);
    });
  }

  return {
    form,
    isGooglePending,
    isNavigating,
    displayedError,
    onSubmit,
    onGoogleClick,
  };
}
