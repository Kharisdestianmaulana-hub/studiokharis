"use client";

import * as React from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useStoryStore } from "@/store/useStoryStore";

// Comb transition requires many strips
const numBlocks = 12;

const blockVariants: Variants = {
  initial: (i: number) => ({
    x: i % 2 === 0 ? "100%" : "-100%",
  }),
  animate: (i: number) => ({
    x: "0%",
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
      delay: i * 0.05, // Fast stagger for entry as well
    },
  }),
  exit: (i: number) => ({
    x: i % 2 === 0 ? "100%" : "-100%",
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
      delay: i * 0.05, // Fast stagger for exit
    },
  }),
};

const getPageName = (path: string, customTitle: string) => {
  if (customTitle && path.includes(customTitle.split('/')[0].trim().toLowerCase())) return customTitle;
  if (path === "/") return "Home";
  if (path === "/globe") return "Visitor Map";
  
  // Clean up any trailing / or ID parameters if it's a known section but we don't have a custom title
  const segments = path.split('/').filter(Boolean);
  const name = segments[0];
  if (!name) return "Home";
  if (name === "globe") return "Visitor Map";
  
  return name.charAt(0).toUpperCase() + name.slice(1).replace('-', ' ');
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const previousPath = useStoryStore((state) => state.previousPath);
  const transitionTitle = useStoryStore((state) => state.transitionTitle);
  
  // We need to capture the titles at the start of the transition so they don't change mid-animation
  const [titles, setTitles] = React.useState({ prev: "", next: "" });
  const [seqPhase, setSeqPhase] = React.useState(0);
  
  React.useEffect(() => {
    // Only play long sequence if paths are different (actual navigation)
    if (previousPath !== pathname && previousPath !== "") {
      setTitles({
        prev: getPageName(previousPath, ""), 
        next: getPageName(pathname, transitionTitle)
      });
      
      setSeqPhase(0);
      const t1 = setTimeout(() => setSeqPhase(1), 500);
      const t2 = setTimeout(() => setSeqPhase(2), 1500);
      const t3 = setTimeout(() => setSeqPhase(3), 2000);
      const t4 = setTimeout(() => setSeqPhase(4), 2500);
      const t5 = setTimeout(() => setSeqPhase(5), 3200);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
    } else {
      // Just open directly if same page (e.g. initial load or refresh)
      setTitles({ prev: "", next: getPageName(pathname, transitionTitle) });
      setSeqPhase(5);
    }
  }, [pathname, previousPath]); // Deliberately omit transitionTitle to prevent restarting timers

  // Update next title dynamically if transitionTitle arrives late
  React.useEffect(() => {
    if (transitionTitle) {
      setTitles(t => ({ ...t, next: getPageName(pathname, transitionTitle) }));
    }
  }, [transitionTitle, pathname]);

  return (
    <>
      <div className="fixed inset-0 z-[100] pointer-events-none flex flex-col">
        {/* The Text Overlay */}
        {seqPhase < 5 && (
          <div className="absolute inset-0 z-[101] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {seqPhase < 2 && (
                <motion.div
                  key="prev-text"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-4xl md:text-6xl font-black text-foreground tracking-widest uppercase text-center px-4"
                >
                  {titles.prev}
                </motion.div>
              )}
              {seqPhase >= 3 && seqPhase < 5 && (
                <motion.div
                  key="new-text"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-4xl md:text-6xl font-black text-foreground tracking-widest uppercase text-center px-4"
                >
                  {titles.next}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* The Comb Blocks */}
        {Array.from({ length: numBlocks }).map((_, i) => (
          <motion.div
            key={`${pathname}-${i}`}
            custom={i}
            variants={blockVariants}
            initial="animate"
            animate={seqPhase === 5 ? "exit" : "animate"}
            className="flex-1 bg-background shadow-[0_0_15px_rgba(0,0,0,0.5)] border-y border-foreground/10"
          />
        ))}
      </div>
      {children}
    </>
  );
}
