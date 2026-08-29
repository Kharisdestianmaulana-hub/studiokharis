"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TransitionLink as Link } from "@/components/layout/TransitionLink";
import { ArrowRight, ArrowLeft } from "lucide-react";

export function ProjectsCoverflow({ projects }: { projects: any[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  if (!projects || projects.length === 0) return null;

  const activeProject = projects[activeIndex];

  // Helper to remove HTML and Markdown tags for short description preview
  const stripHtmlAndMd = (text: string) => {
    return text.replace(/<[^>]*>?/gm, '').replace(/[#*`_\[\]]/g, '').trim();
  };
  
  const shortDescription = stripHtmlAndMd(activeProject.description).substring(0, 150) + "...";

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    // Swipe left (next)
    if (diff > 50 && activeIndex < projects.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
    // Swipe right (prev)
    if (diff < -50 && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
    setTouchStart(null);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Coverflow Carousel */}
      <div 
        className="relative w-full h-[300px] md:h-[450px] flex items-center justify-center overflow-hidden border-y border-border bg-accent/5 dark:bg-accent/10" 
        style={{ perspective: 1200 }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Next/Prev Buttons (Desktop only) */}
        <button
          onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
          className="hidden md:flex absolute left-4 lg:left-12 z-30 w-12 h-12 bg-background border-2 border-foreground items-center justify-center hover:bg-foreground hover:text-background transition-colors disabled:opacity-30 disabled:hover:bg-background disabled:hover:text-foreground disabled:cursor-not-allowed"
          disabled={activeIndex === 0}
          aria-label="Previous Project"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => setActiveIndex(Math.min(projects.length - 1, activeIndex + 1))}
          className="hidden md:flex absolute right-4 lg:right-12 z-30 w-12 h-12 bg-background border-2 border-foreground items-center justify-center hover:bg-foreground hover:text-background transition-colors disabled:opacity-30 disabled:hover:bg-background disabled:hover:text-foreground disabled:cursor-not-allowed"
          disabled={activeIndex === projects.length - 1}
          aria-label="Next Project"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
        {projects.map((project, index) => {
          const diff = index - activeIndex;
          const absDiff = Math.abs(diff);
          
          if (absDiff > 2) return null;
          const isCenter = diff === 0;
          
          const x = diff * 180; // px
          const z = -absDiff * 200; // px
          const rotateY = diff * -15; // degrees (less rotation for brutalism)
          const scale = 1 - (absDiff * 0.1);
          const opacity = isCenter ? 1 : 1 - (absDiff * 0.2);
          const zIndex = 10 - absDiff;

          return (
            <div 
              key={project.originalId}
              className="absolute top-1/2 left-1/2 w-[280px] sm:w-[400px] md:w-[500px] aspect-video -translate-x-1/2 -translate-y-1/2"
              style={{ zIndex }}
            >
              <motion.div
                animate={{
                  x,
                  z,
                  rotateY,
                  scale,
                  opacity,
                }}
                transition={{
                  duration: 0.2,
                  ease: [0.19, 1, 0.22, 1] // brutalist snap curve
                }}
                onClick={() => setActiveIndex(index)}
                className={`w-full h-full p-2 md:p-3 bg-background border-2 border-foreground shadow-none cursor-pointer overflow-hidden transition-all duration-300 ${isCenter ? '' : 'grayscale contrast-125 hover:grayscale-0'}`}
              >
                <div className="w-full h-full border border-border bg-muted relative overflow-hidden">
                  <img 
                    src={project.thumbnail || "/placeholder.svg"} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  {!isCenter && (
                    <div className="absolute inset-0 bg-background/50 pointer-events-none mix-blend-overlay" />
                  )}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Active Project Details */}
      <div className="min-h-[240px] w-full flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.originalId}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col items-start text-left w-full max-w-[500px] mt-8 px-4"
          >
            <div className="bg-foreground text-background px-3 py-1 mb-4 w-fit">
            <h3 className="text-xl md:text-3xl font-black tracking-tight uppercase">
              {activeProject.title}
            </h3>
          </div>
          
          <div className="border border-border p-3 md:p-4 bg-background w-full mb-6">
            <p className="text-xs md:text-sm text-foreground/80 font-mono leading-relaxed">
              {shortDescription}
            </p>
          </div>
          
          <Link 
            href={`/projects/${activeProject.id}`}
            className="flex items-center gap-2 px-4 py-2 border-2 border-foreground bg-background text-foreground hover:bg-foreground hover:text-background transition-colors font-bold uppercase text-xs tracking-widest"
          >
            View Project <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
