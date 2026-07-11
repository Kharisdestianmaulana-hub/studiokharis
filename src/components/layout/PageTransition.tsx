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
      
      // Phase 0: blocks animate in
      setSeqPhase(0);
      
      // Phase 3: blocks are in, show next text
      const t3 = setTimeout(() => setSeqPhase(3), 1000);
      // Phase 4: hide next text
      const t4 = setTimeout(() => setSeqPhase(4), 2200);
      // Phase 5: blocks animate out
      const t5 = setTimeout(() => {
        setSeqPhase(5);
        setIsInitial(false);
      }, 3000);
      return () => { clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
      
    } else if (previousPath !== pathname) {
      // Actual navigation
      setIsInitial(false);
      setTitles({
        prev: getPageName(previousPath, ""), 
        next: getPageName(pathname, transitionTitle)
      });
      
      // Phase 0: Blocks animate IN (text is hidden)
      setSeqPhase(0);
      // Phase 1: Blocks are fully IN, show prev text
      const t1 = setTimeout(() => setSeqPhase(1), 1000);
      // Phase 2: Hide prev text
      const t2 = setTimeout(() => setSeqPhase(2), 2000);
      // Phase 3: Show next text
      const t3 = setTimeout(() => setSeqPhase(3), 2500);
      // Phase 4: Hide next text
      const t4 = setTimeout(() => setSeqPhase(4), 3500);
      // Phase 5: Blocks animate OUT
      const t5 = setTimeout(() => setSeqPhase(5), 4300);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
    } else {
      // Just open directly if same page refresh but previousPath wasn't empty
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
        {seqPhase > 0 && seqPhase < 5 && (
          <div className="absolute inset-0 z-[101] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {seqPhase === 1 && !isInitial && (
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
              {seqPhase === 3 && (
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
            initial="initial"
            animate={seqPhase === 5 ? "exit" : "animate"}
            className="flex-1 bg-background shadow-[0_0_15px_rgba(0,0,0,0.5)] border-y border-foreground/10"
          />
        ))}
      </div>
      {children}
    </>
  );
}
