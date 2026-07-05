import { GoogleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

type AuthGoogleButtonProps = {
  children: React.ReactNode;
};

export default function AuthGoogleButton({ children }: AuthGoogleButtonProps) {
  return (
    <button
      type="button"
      className="flex min-h-12 w-full items-center justify-center gap-3 rounded-md border border-talora-greyish-blue/60 px-6 text-[0.9375rem] font-light text-talora-white transition-colors hover:border-talora-white hover:bg-talora-white hover:text-talora-semi-dark-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-talora-red">
      <HugeiconsIcon icon={GoogleIcon} size={20} aria-hidden="true" />
      {children}
    </button>
  );
}
