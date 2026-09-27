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
    return <div className="hidden md:block w-10 h-10 rounded-none bg-secondary/20 animate-pulse" />;
  }

  const logoSrc = resolvedTheme === "dark" ? "/logo-dark.webp" : "/logo-light.webp";

  return (
    <Link href="/" className="relative hidden md:block md:w-10 md:h-10 hover:scale-105 transition-transform duration-300">
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
