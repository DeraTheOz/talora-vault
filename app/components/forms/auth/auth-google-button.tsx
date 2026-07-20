import { ButtonHTMLAttributes } from "react";

import Image from "next/image";
import GoogleIcon from "@/public/google.svg";

type AuthGoogleButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function AuthGoogleButton({
  children,
  ...props
}: AuthGoogleButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className="flex min-h-12 w-full items-center justify-center gap-3 rounded-md border border-talora-greyish-blue/60 px-6 text-[0.9375rem] font-light text-talora-white transition-colors duration-300 cursor-pointer hover:border-talora-white hover:bg-talora-white hover:text-talora-semi-dark-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-talora-red disabled:cursor-not-allowed disabled:opacity-60">
      <Image src={GoogleIcon} alt="" width={20} height={20} />
      {children}
    </button>
  );
}
