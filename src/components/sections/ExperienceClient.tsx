"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const CATEGORIES = ["ALL", "WORK", "EDUCATION", "CERTIFICATION", "INTERNSHIP", "VOLUNTEER"];

export function ExperienceClient({ experienceData }: { experienceData: any[] }) {
  const [activeCategory, setActiveCategory] = React.useState("ALL");

  const filteredData = React.useMemo(() => {
    if (activeCategory === "ALL") return experienceData;
    return experienceData.filter((exp) => exp.type.toUpperCase() === activeCategory);
  }, [experienceData, activeCategory]);

  return (
    <div className="flex flex-col gap-12 w-full mt-4">
      {/* Category Tabs - Typography Driven */}
      <div className="flex flex-wrap items-center gap-6 border-b border-border/50 pb-2">
        {CATEGORIES.map((category) => {
          const count = category === "ALL" 
            ? experienceData.length 
            : experienceData.filter((exp) => exp.type.toUpperCase() === category).length;
          
          if (count === 0 && category !== "ALL") return null;

          const isActive = activeCategory === category;
          
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "group flex items-center gap-1.5 pb-2 -mb-[9px] text-sm md:text-base font-bold uppercase tracking-widest transition-all duration-300",
                isActive 
                  ? "text-foreground border-b-2 border-foreground" 
                  : "text-muted-foreground border-b-2 border-transparent hover:text-foreground"
              )}
            >
              {category}
              <span className="font-mono text-xs opacity-70 font-normal">
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Experience List - Typography & Hover Driven */}
      <div className="flex flex-col">
        {filteredData.map((exp: any, index: number) => (
          <div 
            key={exp.id} 
            className={cn(
              "group relative flex flex-col md:flex-row gap-4 md:gap-8 py-8 md:py-10 border-b border-border/50 hover:bg-secondary/10 transition-colors duration-300 px-4 -mx-4 rounded-xl md:rounded-none md:hover:bg-transparent md:px-0 md:mx-0",
              index === 0 && "border-t"
            )}
          >
            {/* Left Column: Date & Type */}
            <div className="md:w-1/4 shrink-0 flex flex-col gap-1 md:pt-1">
              <span className="font-mono text-sm font-medium text-foreground/80">{exp.duration}</span>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{exp.type}</span>
            </div>
            
            {/* Right Column: Content */}
            <div className="flex-1 flex flex-col gap-2 relative">
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-foreground md:group-hover:translate-x-2 transition-transform duration-300">
                {exp.role}
              </h3>
              
              <div className="flex items-center gap-2 text-foreground/90 font-medium md:text-lg md:group-hover:translate-x-2 transition-transform duration-300 delay-75">
                <span>{exp.company}</span>
                {exp.address && (
                  <>
                    <span className="text-border/80 hidden md:inline">•</span>
                    <span className="text-sm text-muted-foreground hidden md:inline">{exp.address}</span>
                  </>
                )}
              </div>
              
              {exp.address && (
                 <span className="text-sm text-muted-foreground md:hidden">{exp.address}</span>
              )}

              <p className="text-muted-foreground mt-3 text-sm md:text-base leading-relaxed md:group-hover:translate-x-2 transition-transform duration-300 delay-100">
                {exp.description}
              </p>
              
              {/* Tech Stack */}
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 md:group-hover:translate-x-2 transition-transform duration-300 delay-150">
                  {exp.technologies.map((tech: any) => (
                    <span key={tech} className="text-xs font-mono border border-border/50 px-2 py-1 rounded-sm text-muted-foreground uppercase">
                      {tech}
                    </span>
                  ))}
                </div>
              )}

            </div>
          </div>
        ))}

        {filteredData.length === 0 && (
          <div className="text-muted-foreground italic py-8">
            No experiences found for this category.
          </div>
        )}
      </div>
    </div>
  );
}
