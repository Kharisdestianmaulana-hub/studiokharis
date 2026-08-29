"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TransitionLink as Link } from "@/components/layout/TransitionLink";
import { ArrowRight } from "lucide-react";

export function ProjectsCoverflow({ projects }: { projects: any[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!projects || projects.length === 0) return null;

  const activeProject = projects[activeIndex];

  // Helper to remove HTML tags for short description preview
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>?/gm, '');
  };
  
  const shortDescription = stripHtml(activeProject.description).substring(0, 150) + "...";

  return (
    <div className="flex flex-col items-center w-full">
      {/* Coverflow Carousel */}
      <div 
        className="relative w-full h-[300px] md:h-[450px] flex items-center justify-center overflow-hidden" 
        style={{ perspective: 1200 }}
      >
        {projects.map((project, index) => {
          const diff = index - activeIndex;
          const absDiff = Math.abs(diff);
          
          // Hide cards that are too far away
          if (absDiff > 2) return null;

          const isCenter = diff === 0;
          
          // Calculate positions
          // The center card has x=0, z=0, scale=1, rotateY=0
          // Side cards shift horizontally, push back in Z, rotate inwards, and scale down
          const x = diff * 150; // px
          const z = -absDiff * 150; // px
          const rotateY = diff * -25; // degrees
          const scale = 1 - (absDiff * 0.1);
          const opacity = isCenter ? 1 : 1 - (absDiff * 0.4);
          const zIndex = 10 - absDiff;

          return (
            <div 
              key={project.originalId}
              className="absolute top-1/2 left-1/2 w-[280px] sm:w-[350px] md:w-[450px] aspect-video -translate-x-1/2 -translate-y-1/2"
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
                  duration: 0.6,
                  ease: [0.32, 0.72, 0, 1]
                }}
                onClick={() => setActiveIndex(index)}
                className="w-full h-full rounded-none shadow-2xl overflow-hidden cursor-pointer bg-surface/50 border border-border/50 relative"
              >
                <img 
                  src={project.thumbnail || "/placeholder.svg"} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {!isCenter && (
                  <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                )}
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Active Project Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProject.originalId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center text-center max-w-3xl mt-8 px-4"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {activeProject.title}
          </h3>
          <p className="text-sm md:text-base text-muted mb-6 leading-relaxed">
            {shortDescription}
          </p>
          <Link 
            href={`/projects/${activeProject.id}`}
            className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent transition-colors group"
          >
            View Project 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
