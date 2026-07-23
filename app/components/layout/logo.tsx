import Link from "next/link";

import logo from "@/public/logo.svg";
import Image from "next/image";

export default function Logo() {
  return (
    <Link
      href="/"
      className="inline-flex items-center shrink-0"
      aria-label="Talora Vault home">
      <Image
        src={logo}
        alt=""
        loading="eager"
        className="w-auto h-[1.6rem]"
        style={{ width: "auto" }}
      />
    </Link>
  );
}
