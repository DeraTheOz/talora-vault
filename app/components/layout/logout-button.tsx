"use client";

import { createPortal } from "react-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { Logout01Icon } from "@hugeicons/core-free-icons";
import { useLogout } from "@/features/auth/hooks/use-logout";
import LogoutAuthModal from "../modals/logout-auth-modal";

export default function LogoutButton() {
  const { isPending, showLogoutConfirm, handleLogout, setShowLogoutConfirm } =
    useLogout();

  return (
    <>
      <button
        type="button"
        onClick={() => setShowLogoutConfirm(true)}
        aria-label="Log out"
        className="grid size-10 place-items-center rounded-md text-talora-greyish-blue transition-colors duration-200 cursor-pointer hover:text-talora-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-talora-red active:scale-95 xl:h-10 xl:w-full xl:grid-cols-[6rem_1fr] xl:items-center xl:rounded-lg xl:hover:bg-talora-greyish-blue/10">
        <span className="flex size-10 items-center justify-center xl:justify-self-center">
          <HugeiconsIcon
            icon={Logout01Icon}
            size={24}
            color="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </span>

        <span className="hidden whitespace-nowrap text-sm font-medium opacity-0 transition-opacity duration-200 xl:block xl:group-hover/sidebar:opacity-100 xl:justify-self-start">
          Log out
        </span>
      </button>

      {showLogoutConfirm
        ? createPortal(
            <LogoutAuthModal
              isPending={isPending}
              onConfirm={handleLogout}
              onCancel={() => setShowLogoutConfirm(false)}
            />,
            document.body,
          )
        : null}
    </>
  );
}
