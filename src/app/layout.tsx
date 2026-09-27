import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { DynamicFavicon } from "@/components/layout/DynamicFavicon";
import { RouteTracker } from "@/components/layout/RouteTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://studiokharis.works"),
  title: {
    default: "Kharis - Full Stack Developer",
    template: "%s | Kharis"
  },
  description: "Portfolio of Kharis, a passionate Full Stack Developer specializing in React, Next.js, and modern web technologies.",
  icons: {
    icon: "/logo-light.webp" 
  },
  openGraph: {
    title: "Kharis - Full Stack Developer",
    description: "Portfolio of Kharis, a passionate Full Stack Developer.",
    url: "https://studiokharis.works",
    siteName: "Kharis",
    images: [
      {
        url: "/logo-light.webp",
        width: 800,
        height: 800,
      }
    ],
    locale: "en_US",
    type: "website",
  },
};

import { PageTransition } from "@/components/layout/PageTransition";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { getLocale } from "@/lib/i18n";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialLocale = getLocale();

  return (
    <html lang={initialLocale} suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased min-h-screen bg-background text-foreground">
        <RouteTracker />
        <LanguageProvider initialLocale={initialLocale}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <DynamicFavicon />
            <PageTransition />
            {children}
            <Toaster position="bottom-right" />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
