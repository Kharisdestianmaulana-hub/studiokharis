"use client";

import { useEffect, useState } from "react";
import { useSettingsStore } from "@/store/settingsStore";
import { useTheme } from "next-themes";

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const { reducedMotion, textSize } = useSettingsStore();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Accent color is now purely CSS-driven via globals.css

    // Apply reduced motion
    if (reducedMotion) {
      document.documentElement.classList.add("reduced-motion");
    } else {
      document.documentElement.classList.remove("reduced-motion");
    }

    // Apply text size
    if (textSize === "large") {
      document.documentElement.classList.add("text-large");
    } else {
      document.documentElement.classList.remove("text-large");
    }
    
  }, [mounted, reducedMotion, textSize, resolvedTheme]);

  // To prevent hydration errors, we can still render children but we must be careful with what relies on the store directly in the UI.
  return <>{children}</>;
}
