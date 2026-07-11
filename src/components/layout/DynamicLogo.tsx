"use client";

import * as React from "react";
import Image from "next/image";
import { TransitionLink as Link } from "@/components/layout/TransitionLink";
import { useTheme } from "next-themes";

export function DynamicLogo() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by rendering a placeholder
  if (!mounted) {
    return <div className="w-8 h-8 rounded-full bg-secondary/20 animate-pulse" />;
  }

  const logoSrc = resolvedTheme === "dark" ? "/logo-dark.webp" : "/logo-light.webp";

  return (
    <Link href="/" className="relative w-8 h-8 md:w-9 md:h-9 hover:scale-105 transition-transform duration-300">
      <Image
        src={logoSrc}
        alt="Kharis Logo"
        fill
        className="object-contain"
        priority
      />
    </Link>
  );
}
