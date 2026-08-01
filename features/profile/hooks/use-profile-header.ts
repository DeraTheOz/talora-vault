"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  regenerateAvatarAction,
  verifyEmailAction,
} from "../actions/profile-actions";
import { toast } from "sonner";

export function useProfileHeader(emailVerified: Date | null) {
  const router = useRouter();
  const t = useTranslations("profile");
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(emailVerified !== null);
  const [isVerifying, startVerifyTransition] = useTransition();
  const [isGenerating, startRegenerateTransition] = useTransition();

  function handleVerify() {
    startVerifyTransition(async () => {
      try {
        const result = await verifyEmailAction();
        startVerifyTransition(() => {
          if (result.success) {
            setIsVerified(true);
            setIsOpen(false);

            toast.success(t("toastEmailVerified"));
          } else {
            toast.error(result.error ?? t("toastEmailVerificationFailed"));
          }
        });
      } catch {
        toast.error(t("toastEmailVerificationFailed"));
      }
    });
  }

  function handleRegenerate() {
    startRegenerateTransition(async () => {
      try {
        const result = await regenerateAvatarAction();
        startRegenerateTransition(() => {
          if (result.success) {
            router.refresh();
            toast.success(t("toastAvatarRegenerated"));
          } else {
            toast.error(t("toastAvatarRegenerationFailed"));
          }
        });
      } catch {
        toast.error(t("toastAvatarRegenerationFailed"));
      }
    });
  }

  return {
    t,
    isOpen,
    isEditOpen,
    isVerifying,
    isVerified,
    isGenerating,
    setIsOpen,
    setIsEditOpen,
    handleVerify,
    handleRegenerate,
  };
}
