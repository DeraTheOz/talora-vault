import Image from "next/image";

import { HugeiconsIcon } from "@hugeicons/react";
import { Login01Icon } from "@hugeicons/core-free-icons";

import Logo from "../ui/logo";
import NavLinks from "../ui/nav-links";

import avatar from "@/public/image-avatar.png";
import { auth } from "@/auth";
import Link from "next/link";
import LogoutButton from "./logout-button";

export default async function Sidebar() {
  const session = await auth();
  const user = session?.user;

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

        <div className="flex items-center gap-4 xl:mt-auto xl:grid xl:w-full xl:grid-cols-[6rem_1fr] xl:overflow-visible xl:rounded-none xl:ring-0">
          {user ? (
            <>
              <div className="size-8 overflow-hidden rounded-lg xl:justify-self-center ring-2 ring-talora-greyish-blue">
                <Image
                  src={user.image ?? avatar}
                  alt={
                    user.name
                      ? `${user.name} profile`
                      : "Signed in user profile"
                  }
                  width={32}
                  height={32}
                  className="size-full object-cover"
                />
              </div>

              <LogoutButton />
            </>
          ) : (
            <Link
              href="/login"
              aria-label="Login"
              className="grid size-10 place-items-center rounded-md text-talora-greyish-blue transition-colors duration-200 hover:text-talora-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-talora-red active:scale-95 xl:ml-auto xl:mr-6">
              <HugeiconsIcon
                icon={Login01Icon}
                size={24}
                color="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </Link>
          )}
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
