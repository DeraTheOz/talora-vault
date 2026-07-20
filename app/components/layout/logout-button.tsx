"use client";

import { useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { HugeiconsIcon } from "@hugeicons/react";
import { Logout01Icon } from "@hugeicons/core-free-icons";
import { logoutAction } from "@/features/auth/actions/auth-actions";

export default function LogoutButton() {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLogout = () => {
    startTransition(async () => {
      try {
        const result = await logoutAction();

        // Check for returned error objects from the server action
        if (result?.error) {
          toast.error(result.error);
          return;
        }

        toast.success("Logged out successfully");

        // Close the modal, redirect the user home, and refresh state
        setShowLogoutConfirm(false);
        router.push("/");
        router.refresh();
      } catch {
        toast.error("Failed to log out. Please try again.");
      }
    });
  };

  // Logout confirmation modal
  const logoutModal = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-confirm-title"
      className="fixed inset-0 z-50 grid place-items-center bg-talora-dark-blue/80 px-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-talora-semi-dark-blue p-6 text-talora-white shadow-2xl">
        <h2 id="logout-confirm-title" className="text-xl font-medium">
          Are you sure you want to log out?
        </h2>

        <p className="mt-2 text-sm text-talora-white/70">
          You will need to log back in to access your watchlist, leave reviews,
          and view your personalized dashboard.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleLogout}
            disabled={isPending}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg bg-talora-red px-6 text-sm font-medium text-talora-white cursor-pointer transition hover:bg-talora-red/85 
  disabled:opacity-50">
            {isPending ? "Logging out..." : "Log out"}
          </button>

          <button
            type="button"
            onClick={() => setShowLogoutConfirm(false)}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg bg-talora-white/10 px-6 text-sm font-medium text-talora-white cursor-pointer transition    
  hover:bg-talora-white/15">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setShowLogoutConfirm(true)}
        aria-label="Log out"
        className="grid size-10 place-items-center rounded-md text-talora-greyish-blue transition-colors duration-200 hover:text-talora-white focus-visible:outline-2 focus-         
  visible:outline-offset-4 focus-visible:outline-talora-red active:scale-95 xl:ml-auto xl:mr-6 xl:w-auto xl:grid-cols-1 xl:place-items-stretch xl:items-center">
        <span className="flex size-10 items-center justify-center xl:justify-self-center">
          <HugeiconsIcon
            icon={Logout01Icon}
            size={24}
            color="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </span>
      </button>

      {showLogoutConfirm ? createPortal(logoutModal, document.body) : null}
    </>
  );
}
