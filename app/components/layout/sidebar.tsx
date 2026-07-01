import Image from "next/image";
import Logo from "../ui/logo";
import NavLinks from "../ui/nav-links";

import avatar from "@/public/image-avatar.png";

export default function Sidebar() {
  return (
    <aside
      aria-label="Primary navigation"
      className="z-20 flex shrink-0 h-14 items-center justify-between rounded-[0.625rem] bg-talora-semi-dark-blue px-4 md:h-18 md:rounded-[1.25rem] md:px-6 xl:sticky xl:top-0 xl:rounded-none xl:h-dvh xl:w-24 xl:flex-col xl:px-0 xl:py-8">
      <Logo />

      <nav
        aria-label="Main menu"
        className="flex items-center xl:mt-16 xl:flex-1 xl:items-start">
        <NavLinks />
      </nav>

      <div className="size-6 overflow-hidden rounded-full ring-1 ring-talora-white md:size-8 xl:mt-auto">
        <Image
          src={avatar}
          alt="Signed in user profile"
          className="size-full object-cover"
        />
      </div>
    </aside>
  );
}
