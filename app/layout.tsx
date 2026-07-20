import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import QueryProvider from "./components/providers/query-provider";
import { Toaster } from "sonner";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Talora Vault",
  description:
    "Discover movies and TV series with Talora Vault — watchlists, recommendations, and entertainment insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.className} h-full antialiased`}
      data-scroll-behavior="smooth">
      <body className="min-h-dvh flex flex-col">
        <QueryProvider>{children}</QueryProvider>

        <Toaster
          position="top-center"
          toastOptions={{
            unstyled: true,
            classNames: {
              toast:
                "group !w-fit max-w-[420px] mx-auto flex items-center gap-3 rounded-xl bg-talora-semi-dark-blue shadow-xl px-4 py-3.5 transition-all duration-300",
              title: "text-base font-medium text-talora-white",
              description: "text-sm text-talora-greyish-blue",
              success: "[&_svg]:text-emerald-400 [&_svg]:shrink-0",
              error:
                "[&_[data-title]]:text-talora-red [&_svg]:text-talora-red [&_svg]:shrink-0",
              info: "[&_svg]:text-blue-400 [&_svg]:shrink-0",
              warning: "[&_svg]:text-amber-400 [&_svg]:shrink-0",
            },
          }}
        />
      </body>
    </html>
  );
}
