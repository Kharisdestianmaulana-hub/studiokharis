"use client";

import { motion } from "framer-motion";
import { useSettingsStore } from "@/store/settingsStore";
import { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  const { reducedMotion } = useSettingsStore();

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <div className="w-full h-full relative">
      {children}
    </div>
  );
}
