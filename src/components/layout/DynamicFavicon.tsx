"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export function DynamicFavicon() {
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    if (!resolvedTheme) return;

    // Find the existing icon link or create a new one
    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    // Set the appropriate favicon based on theme
    link.href = resolvedTheme === "dark" ? "/logo-dark.webp" : "/logo-light.webp";
  }, [resolvedTheme]);

  return null; // This component doesn't render anything
}
