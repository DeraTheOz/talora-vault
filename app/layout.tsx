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
            classNames: {
              toast: "text-talora-white",
              title: "text-base font-medium text-talora-white",
              description: "text-sm text-talora-white",
            },
            style: {
              backgroundColor: "var(--color-talora-semi-dark-blue)",
              border: "1px solid var(--color-talora-semi-dark-blue)",
              borderRadius: "6px",
              color: "var(--color-talora-white)",
            },
          }}
        />
      </body>
    </html>
  );
}
