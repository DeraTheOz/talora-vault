import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import QueryProvider from "./components/providers/query-provider";
import ServiceWorkerRegister from "./components/pwa/service-worker-register";
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
  applicationName: "Talora Vault",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Talora Vault",
  },
  icons: {
    icon: [
      { url: "/icon-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#10141E",
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${outfit.className} h-full antialiased`}
      data-scroll-behavior="smooth">
      <body className="min-h-dvh flex flex-col">
        <NextIntlClientProvider>
          <QueryProvider>{children}</QueryProvider>
        </NextIntlClientProvider>

        <ServiceWorkerRegister />

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
