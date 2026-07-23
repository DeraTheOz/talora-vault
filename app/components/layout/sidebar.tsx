import Image from "next/image";

import Logo from "./logo";
import NavLinks from "./nav-links";

import avatar from "@/public/image-avatar.png";
import { auth } from "@/auth";
import LogoutButton from "./logout-button";
import LoginButton from "./login-button";
import { formatName } from "@/lib/helpers/format";
import { db } from "@/db/client";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

export default async function Sidebar() {
  const session = await auth();
  const user = session?.user;
  let profileImage = user?.image;

  if (user?.id && !profileImage) {
    const [dbUser] = await db
      .select({ image: users.image })
      .from(users)
      .where(eq(users.id, user.id))
      .limit(1);
    profileImage = dbUser?.image ?? null;
  }

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
          aria-label="Desktop main menu"
          className="hidden xl:mt-16 xl:flex xl:w-full xl:flex-1">
          <NavLinks variant="desktop" />
        </nav>

        <div className="flex items-center gap-4 xl:mt-auto xl:flex xl:w-full xl:flex-col">
          {user ? (
            <>
              {/* Profile row */}
              <div className="flex items-center xl:grid xl:h-10 xl:w-full xl:grid-cols-[6rem_1fr] xl:rounded-lg xl:hover:bg-talora-greyish-blue/10">
                <div className="size-8 overflow-hidden rounded-lg ring-2 ring-talora-greyish-blue xl:justify-self-center">
                  <Image
                    src={profileImage ?? avatar}
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

                <span className="hidden whitespace-nowrap text-sm font-medium text-talora-white opacity-0 transition-opacity duration-200 xl:block xl:group-hover/sidebar:opacity-100">
                  {formatName(user.name)}
                </span>
              </div>

              {/* Logout button row */}
              <LogoutButton />
            </>
          ) : (
            <LoginButton />
          )}
        </div>
      </aside>

      {/* Bottom navigation(mobile / tablet) */}
      <nav
        aria-label="Main menu"
        className="fixed -mx-4 inset-x-4 bottom-0 z-30 rounded-t-[0.625rem] bg-talora-semi-dark-blue px-3 py-2 sm:py-4 sm:rounded-t-2xl xl:hidden">
        <NavLinks variant="bottom" />
      </nav>
    </>
  );
}
