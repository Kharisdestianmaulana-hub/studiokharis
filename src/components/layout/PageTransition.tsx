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
  if (path === "/") return "Home";
  
  const exactSections: Record<string, string> = {
    "/articles": "Articles",
    "/projects": "Projects",
    "/experience": "Experience",
    "/tech-stack": "Tech Stack",
    "/contact": "Contact",
    "/guestbook": "Guestbook",
    "/globe": "Visitor Map",
    "/about": "About",
    "/timeline": "Timeline",
  };
  if (exactSections[path]) return exactSections[path];

  if (customTitle && path.includes(customTitle.split('/')[0].trim().toLowerCase())) return customTitle;
  
  const segments = path.split('/').filter(Boolean);
  const name = segments[0];
  if (!name) return "Home";
  
  return name.charAt(0).toUpperCase() + name.slice(1).replace('-', ' ');
};

import { useRouter } from "next/navigation";

export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const previousPath = useStoryStore((state) => state.previousPath);
  const transitionTitle = useStoryStore((state) => state.transitionTitle);
  const pendingRoute = useStoryStore((state) => state.pendingRoute);
  const setPendingRoute = useStoryStore((state) => state.setPendingRoute);
  
  const [titles, setTitles] = React.useState({ prev: "", next: "" });
  const [seqPhase, setSeqPhase] = React.useState(0);
  const [isInitial, setIsInitial] = React.useState(true);
  
  const [isInitialLoad] = React.useState(() => {
    if (typeof window === 'undefined') return false;
    return !sessionStorage.getItem('studiokharis_initial_done');
  });

  const hasStartedAnimation = React.useRef(false);
  const lastPathname = React.useRef(pathname);
  const expectedPathname = React.useRef<string | null>(null);

  React.useEffect(() => {
    if (hasStartedAnimation.current) return;
    hasStartedAnimation.current = true;

    if (isInitialLoad) {
      sessionStorage.setItem('studiokharis_initial_done', 'true');
      
      const hasVisited = localStorage.getItem('studiokharis_visited');
      const welcomeText = hasVisited ? "WELCOME BACK" : "WELCOME";
      if (!hasVisited) localStorage.setItem('studiokharis_visited', 'true');
      
      setTitles({ prev: "", next: welcomeText });
      setIsInitial(true);
      
      setSeqPhase(0);
      const t3 = setTimeout(() => setSeqPhase(3), 1000);
      const t4 = setTimeout(() => setSeqPhase(4), 2200);
      const t5 = setTimeout(() => {
        setSeqPhase(5);
        setIsInitial(false);
      }, 3000);
      
      return () => { clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
    }
  }, []); // Run exactly once per mount

  // Watch for pending routes (intercepted Link clicks)
  React.useEffect(() => {
    if (pendingRoute) {
      setIsInitial(false);
      const prev = previousPath === pathname ? "/" : previousPath;
      
      setTitles({
        prev: getPageName(prev, ""), 
        next: getPageName(pendingRoute, transitionTitle)
      });

      // Phase 0: Blocks animate IN
      setSeqPhase(0);
      
      // Wait for blocks to fully cover screen (1000ms), then navigate!
      const tNav = setTimeout(() => {
        // Preemptively set expectedPathname so the Back/Forward watcher ignores the intermediate state
        const targetPath = pendingRoute.split('?')[0].split('#')[0];
        expectedPathname.current = targetPath;
        
        router.push(pendingRoute);
        setPendingRoute(null);
        
        // Continue animation sequence AFTER route change
        setSeqPhase(1);
        setTimeout(() => setSeqPhase(2), 1000);
        setTimeout(() => setSeqPhase(3), 1500);
        setTimeout(() => setSeqPhase(4), 2500);
        setTimeout(() => setSeqPhase(5), 3300);
      }, 1000);
      
      return () => clearTimeout(tNav);
    }
  }, [pendingRoute, previousPath, pathname, transitionTitle, router, setPendingRoute]);

  // Watch for Back/Forward navigation (pathname changed without pendingRoute)
  React.useEffect(() => {
    if (hasStartedAnimation.current && !pendingRoute && pathname !== lastPathname.current) {
      if (expectedPathname.current) {
        if (pathname !== expectedPathname.current) {
          // Still waiting for router.push to finish updating pathname. Ignore.
          return;
        } else {
          // The programmatic navigation has finished.
          expectedPathname.current = null;
          lastPathname.current = pathname;
          return;
        }
      }

      // It's a popstate (Back/Forward) or an unintercepted navigation
      lastPathname.current = pathname;
      setIsInitial(false);
      const prev = previousPath === pathname ? "/" : previousPath;
      
      setTitles({
        prev: getPageName(prev, ""), 
        next: getPageName(pathname, transitionTitle)
      });
      
      // Since it's instant, just do the normal sequence
      setSeqPhase(0);
      const t1 = setTimeout(() => setSeqPhase(1), 1000);
      const t2 = setTimeout(() => setSeqPhase(2), 2000);
      const t3 = setTimeout(() => setSeqPhase(3), 2500);
      const t4 = setTimeout(() => setSeqPhase(4), 3500);
      const t5 = setTimeout(() => setSeqPhase(5), 4300);
      
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
    }
  }, [pathname, transitionTitle, pendingRoute, previousPath]);

  React.useEffect(() => {
    if (transitionTitle && !isInitial && !pendingRoute) {
      setTitles(t => ({ ...t, next: getPageName(pathname, transitionTitle) }));
    }
  }, [transitionTitle, pathname, isInitial, pendingRoute]);

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
                  {!isInitial && <span className="text-muted-foreground mr-3 text-2xl md:text-4xl">TO</span>}
                  {titles.next}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {Array.from({ length: numBlocks }).map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={blockVariants}
            initial="initial"
            animate={seqPhase === 5 ? "exit" : "animate"}
            className="flex-1 bg-background shadow-[0_0_15px_rgba(0,0,0,0.5)] border-y border-foreground/10"
          />
        ))}
      </div>
    </>
  );
}
