import Logo from "@/app/components/layout/logo";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-dvh bg-talora-dark-blue px-6 py-12 md:px-8">
      <div className="mx-auto flex min-h-[calc(100dvh-6rem)] w-full max-w-100 flex-col items-center justify-center gap-14">
        <Logo />
        {children}
      </div>
    </main>
  );
}
