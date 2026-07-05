import type { InputHTMLAttributes } from "react";

type AuthFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className"
> & {
  label: string;
};

export default function AuthField({ label, ...props }: AuthFieldProps) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <input
        {...props}
        className="w-full border-0 border-b border-talora-greyish-blue bg-transparent px-4 pb-4 text-[0.9375rem] font-light text-talora-white outline-none transition-colors placeholder:text-talora-white/50 focus:border-talora-white"
      />
    </label>
  );
}
