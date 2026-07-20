import type { ButtonHTMLAttributes } from "react";

type AuthSubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function AuthSubmitButton({
  children,
  ...props
}: AuthSubmitButtonProps) {
  return (
    <button
      type="submit"
      {...props}
      className="min-h-12 w-full rounded-md bg-talora-red px-6 text-[0.9375rem] font-light text-talora-white transition-colors duration-300 hover:bg-talora-white cursor-pointer hover:text-talora-semi-dark-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-talora-red disabled:opacity-60 disabled:cursor-not-allowed">
      {children}
    </button>
  );
}
