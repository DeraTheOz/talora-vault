import { getTranslations } from "next-intl/server";
import Logo from "./logo";
import NavLinks from "./nav-links";
import SidebarProfileLink from "./sidebar-profile-link";

import { auth } from "@/auth";
import LogoutButton from "./logout-button";
import LoginButton from "./login-button";
import { db } from "@/db/client";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

export default async function Sidebar() {
  const session = await auth();
  const t = await getTranslations("navigation");
  const user = session?.user;
  let profileImage = user?.image ?? null;
  let profileName = user?.name ?? null;
  let emailVerified: Date | null = null;

  if (user?.id) {
    const [dbUser] = await db
      .select({
        name: users.name,
        image: users.image,
        emailVerified: users.emailVerified,
      })
      .from(users)
      .where(eq(users.id, user.id))
      .limit(1);

    if (dbUser) {
      if (!profileImage) profileImage = dbUser.image;
      if (dbUser.name) profileName = dbUser.name;
      emailVerified = dbUser.emailVerified;
    }
  }

  return (
    <>
      <aside
        aria-label={t("primaryNavigation")}
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
          aria-label={t("desktopMenu")}
          className="hidden xl:mt-16 xl:flex xl:w-full xl:flex-1">
          <NavLinks variant="desktop" />
        </nav>

        <div className="flex items-center gap-4 xl:mt-auto xl:flex xl:w-full xl:flex-col">
          {user ? (
            <>
              {/* Profile row */}
              <SidebarProfileLink
                name={profileName}
                image={profileImage}
                emailVerified={emailVerified}
              />

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
        aria-label={t("mainMenu")}
        className="fixed -mx-4 inset-x-4 bottom-0 z-30 rounded-t-[0.625rem] bg-talora-semi-dark-blue px-3 py-2 sm:py-4 sm:rounded-t-2xl xl:hidden">
        <NavLinks variant="bottom" />
      </nav>
    </>
  );
}
