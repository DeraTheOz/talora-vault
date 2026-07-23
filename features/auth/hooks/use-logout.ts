import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { logoutAction } from "../actions/auth-actions";
import { toast } from "sonner";

export function useLogout() {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

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
          router.refresh();
          setShowLogoutConfirm(false);
          toast.success("Logged out successfully");
        });
      } catch {
        toast.error("Failed to log out. Please try again.");
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
