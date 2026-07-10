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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
