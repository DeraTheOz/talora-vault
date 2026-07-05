import Link from "next/link";

type AuthSwitchLinkProps = {
  prompt: string;
  href: string;
  label: string;
};

export default function AuthSwitchLink({
  prompt,
  href,
  label,
}: AuthSwitchLinkProps) {
  return (
    <p className="mt-6 text-center text-[0.9375rem] font-light">
      {prompt}{" "}
      <Link
        href={href}
        className="text-talora-red transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-talora-red">
        {label}
      </Link>
    </p>
  );
}
