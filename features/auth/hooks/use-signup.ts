"use client";

import { useState, useTransition, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import {
  createSignupSchema,
  type SignupInput,
} from "@/features/auth/schemas/auth-schema";
import {
  googleSignInAction,
  signupAction,
} from "@/features/auth/actions/auth-actions";
import { toastStyles } from "@/lib/constants/toast";

export function useSignup() {
  const t = useTranslations("auth");
  const [formError, setFormError] = useState<string | null>(null);
  const [isGooglePending, startGoogleTransition] = useTransition();
  const [isNavigating, startNavigationTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();

  const signupSchema = useMemo(() => createSignupSchema(t), [t]);

  const form = useForm<SignupInput>({
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
      // Hold transition while redirecting to login page
      startNavigationTransition(() => {
        router.push("/login");
        toast.success(t("accountCreated"));
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
    formError,
    isGooglePending,
    isNavigating,
    onSubmit,
    onGoogleClick,
  };
}
