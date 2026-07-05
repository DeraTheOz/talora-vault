export default function AuthCard({
  title,
  children,
}: Readonly<{
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full rounded-[1.25rem] bg-talora-semi-dark-blue px-6 py-8 md:px-8">
      <h1 className="mb-10 text-[2rem] font-light leading-none tracking-normal">
        {title}
      </h1>

      {children}
    </div>
  );
}
