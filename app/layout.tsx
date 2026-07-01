import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import Sidebar from "./components/layout/sidebar";

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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-talora-white focus:px-4 focus:py-2 focus:text-talora-dark-blue">
          Skip to main content
        </a>

        <div className="mx-auto flex h-dvh w-full flex-col overflow-hidden gap-6 px-4 py-4 md:px-6 md:py-6 xl:flex-row xl:gap-9 xl:px-0 xl:py-0">
          <Sidebar />

          <main
            id="main-content"
            tabIndex={-1}
            className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto scrollbar-none outline-none xl:pt-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
