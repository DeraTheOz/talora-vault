import Image from "next/image";

import { HugeiconsIcon } from "@hugeicons/react";
import { Logout01Icon } from "@hugeicons/core-free-icons";

import Logo from "../ui/logo";
import NavLinks from "../ui/nav-links";

import avatar from "@/public/image-avatar.png";

export default function Sidebar() {
  return (
    <>
      <aside
        aria-label="Primary navigation"
        className="group/sidebar z-30 flex h-14 shrink-0 items-center justify-between rounded-[0.625rem] bg-talora-semi-dark-blue px-4 transition-[width] duration-300 ease-out md:h-20 md:rounded-[1.25rem] md:px-6 xl:sticky xl:top-0 xl:h-dvh xl:w-24 xl:flex-col xl:items-start xl:justify-start xl:overflow-hidden xl:rounded-none xl:px-0 xl:py-8 xl:hover:w-72">
        <div className="flex items-center xl:grid xl:w-full xl:grid-cols-[6rem_1fr]">
          <div className="flex items-center justify-center">
            <Logo />
          </div>

          <span
            aria-hidden="true"
            className="hidden whitespace-nowrap text-lg font-medium text-talora-white opacity-0 transition-opacity duration-200 xl:block xl:group-hover/sidebar:opacity-100">
            Talora Vault
          </span>
        </div>

        <nav
          aria-label="Tablet main menu"
          className="hidden items-center sm:flex xl:hidden">
          <NavLinks variant="tablet" />
        </nav>

        <nav
          aria-label="Desktop main menu"
          className="hidden xl:mt-16 xl:flex xl:w-full xl:flex-1">
          <NavLinks variant="desktop" />
        </nav>

        <div className="flex items-center gap-4 overflow-hidden rounded-full xl:mt-auto xl:grid xl:w-full xl:grid-cols-[6rem_1fr] xl:overflow-visible xl:rounded-none xl:ring-0">
          <div className="size-8 overflow-hidden rounded-full xl:justify-self-center">
            <Image
              src={avatar}
              alt="Signed in user profile"
              className="size-full object-cover"
            />
          </div>

          <button
            type="button"
            aria-label="Log out"
            className="grid size-10 place-items-center rounded-md text-talora-greyish-blue transition-colors duration-200 hover:text-talora-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-talora-red active:scale-95 xl:ml-auto xl:mr-6 xl:w-auto xl:grid-cols-1 xl:place-items-stretch xl:items-center">
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
        </div>
      </aside>

      <nav
        aria-label="Mobile main menu"
        className="fixed -mx-4 inset-x-4 bottom-0 z-30 rounded-t-[0.625rem] bg-talora-semi-dark-blue px-3 py-2 shadow-2xl shadow-black/30 sm:hidden">
        <NavLinks variant="bottom" />
      </nav>
    </>
  );
}
