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
  cover: {
    x: "0%",
  },
  animate: (i: number) => ({
    x: "0%",
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
      delay: i * 0.05, 
    },
  }),
  exit: (i: number) => ({
    x: i % 2 === 0 ? "100%" : "-100%",
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
      delay: i * 0.05, 
    },
  }),
};

const getPageName = (path: string, customTitle: string) => {
  if (customTitle && path.includes(customTitle.split('/')[0].trim().toLowerCase())) return customTitle;
  if (path === "/") return "Home";
  if (path === "/globe") return "Visitor Map";
  
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
  
  const [titles, setTitles] = React.useState({ prev: "", next: "" });
  const [seqPhase, setSeqPhase] = React.useState(0);
  const [isInitial, setIsInitial] = React.useState(true);
  
  React.useEffect(() => {
    if (previousPath === "") {
      // Initial load
      const hasVisited = localStorage.getItem('studiokharis_visited');
      const welcomeText = hasVisited ? "WELCOME BACK" : "WELCOME";
      if (!hasVisited) {
        localStorage.setItem('studiokharis_visited', 'true');
      }
      
      setTitles({ prev: "", next: welcomeText });
      setSeqPhase(3); // Start at phase 3 to show the text
      
      const t4 = setTimeout(() => setSeqPhase(4), 1200);
      const t5 = setTimeout(() => {
        setSeqPhase(5);
        setIsInitial(false);
      }, 2000);
      return () => { clearTimeout(t4); clearTimeout(t5); };
      
    } else if (previousPath !== pathname) {
      // Actual navigation
      setIsInitial(false);
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
      // Just open directly if same page refresh but previousPath wasn't empty (edge case)
      setIsInitial(false);
      setTitles({ prev: "", next: getPageName(pathname, transitionTitle) });
      setSeqPhase(5);
    }
  }, [pathname, previousPath]);

  React.useEffect(() => {
    if (transitionTitle && !isInitial) {
      setTitles(t => ({ ...t, next: getPageName(pathname, transitionTitle) }));
    }
  }, [transitionTitle, pathname, isInitial]);

  return (
    <>
      <div className="fixed inset-0 z-[100] pointer-events-none flex flex-col">
        {seqPhase < 5 && (
          <div className="absolute inset-0 z-[101] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {seqPhase < 2 && !isInitial && (
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

        {Array.from({ length: numBlocks }).map((_, i) => (
          <motion.div
            key={`${pathname}-${i}`}
            custom={i}
            variants={blockVariants}
            initial={isInitial ? "cover" : "initial"}
            animate={seqPhase === 5 ? "exit" : (isInitial ? "cover" : "animate")}
            className="flex-1 bg-background shadow-[0_0_15px_rgba(0,0,0,0.5)] border-y border-foreground/10"
          />
        ))}
      </div>
      {children}
    </>
  );
}
