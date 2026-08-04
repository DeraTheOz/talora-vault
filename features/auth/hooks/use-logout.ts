"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { logoutAction } from "../actions/auth-actions";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export function useLogout() {
  const t = useTranslations("auth");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  function handleLogout() {
    startTransition(async () => {
      try {
        const result = await logoutAction();

        if (result?.error) {
          toast.error(result.error);
          return;
        }

        // Defer UI update & toast until router.refresh finishes
        startTransition(() => {
          if (pathname.startsWith("/profile")) {
            router.push("/");
          } else {
            router.refresh();
          }
          setShowLogoutConfirm(false);
          toast.success(t("loggedOutSuccessfully"));
        });
      } catch {
        toast.error(t("logoutFailedGeneric"));
      }
    });
  }

  return {
    isPending,
    showLogoutConfirm,
    setShowLogoutConfirm,
    handleLogout,
  };
}
