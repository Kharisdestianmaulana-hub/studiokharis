"use client";

import { useEffect, useState } from "react";
import { useSettingsStore } from "@/store/settingsStore";
import { useTheme } from "next-themes";

const accentColors = {
  blue: { light: "#2563EB", dark: "#3B82F6" },
  green: { light: "#16A34A", dark: "#22C55E" },
  purple: { light: "#9333EA", dark: "#A855F7" },
  orange: { light: "#EA580C", dark: "#F97316" },
};

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const { accentColor, reducedMotion, textSize } = useSettingsStore();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Apply accent color
    const colors = accentColors[accentColor] || accentColors.blue;
    const isDark = resolvedTheme === "dark";
    document.documentElement.style.setProperty("--color-accent", isDark ? colors.dark : colors.light);

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
    
  }, [mounted, accentColor, reducedMotion, textSize, resolvedTheme]);

  // To prevent hydration errors, we can still render children but we must be careful with what relies on the store directly in the UI.
  return <>{children}</>;
}
