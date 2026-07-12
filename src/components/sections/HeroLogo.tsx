"use client";

import * as React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

export function HeroLogo() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-secondary/20 animate-pulse" />;
  }

  const logoSrc = resolvedTheme === "dark" ? "/logo-dark.webp" : "/logo-light.webp";

  return (
    <div className="relative w-20 h-20 md:w-28 md:h-28">
      <Image
        src={logoSrc}
        alt="Kharis Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}
