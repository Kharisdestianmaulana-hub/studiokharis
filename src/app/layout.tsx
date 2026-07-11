import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { DynamicFavicon } from "@/components/layout/DynamicFavicon";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kharis - Full Stack Developer",
    template: "%s | Kharis"
  },
  description: "Portfolio of Kharis, a passionate Full Stack Developer specializing in React, Next.js, and modern web technologies.",
  icons: {
    // We provide a fallback, but DynamicFavicon will handle theme switching on the client
    icon: "/logo-light.webp" 
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased min-h-screen bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DynamicFavicon />
          {children}
          <Toaster />

        </ThemeProvider>
      </body>
    </html>
  );
}
