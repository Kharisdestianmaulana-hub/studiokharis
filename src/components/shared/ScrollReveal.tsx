"use client";

import { motion } from "framer-motion";
import { useSettingsStore } from "@/store/settingsStore";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
}

export function ScrollReveal({ 
  children, 
  className = "", 
  delay = 0,
  duration = 0.5,
  yOffset = 30
}: ScrollRevealProps) {
  const { reducedMotion } = useSettingsStore();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
