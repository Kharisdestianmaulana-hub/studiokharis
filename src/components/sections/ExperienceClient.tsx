"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

const CATEGORIES = ["ALL", "WORK", "EDUCATION", "CERTIFICATION", "INTERNSHIP", "VOLUNTEER"];

export function ExperienceClient({ experienceData }: { experienceData: any[] }) {
  const [activeCategory, setActiveCategory] = React.useState("ALL");
  const [sortOrder, setSortOrder] = React.useState<"newest" | "oldest">("newest");

  const filteredData = React.useMemo(() => {
    let result = experienceData;
    if (activeCategory !== "ALL") {
      result = result.filter((exp) => exp.type.toUpperCase() === activeCategory);
    }
    
    if (sortOrder === "oldest") {
      return [...result].reverse();
    }
    return result;
  }, [experienceData, activeCategory, sortOrder]);

  return (
    <div className="flex flex-col gap-12 w-full mt-4">
      {/* Category Tabs & Sort */}
      <div className="flex items-center border-b-[3px] border-foreground relative overflow-x-auto [&::-webkit-scrollbar]:hidden w-full mb-4">
        <div className="flex items-center gap-2 md:gap-4 min-w-max">
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
                  "group flex items-center gap-1.5 px-4 py-3 -mb-[3px] text-sm md:text-base font-black uppercase tracking-widest transition-none border-[3px]",
                  isActive 
                    ? "text-background bg-foreground border-foreground" 
                    : "text-foreground bg-background border-transparent hover:border-foreground"
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

        {/* Sort Toggle */}
        <div className="shrink-0 pl-4 border-l border-border/50 py-2 pb-3 flex items-center ml-auto">
          <button
            onClick={() => setSortOrder(prev => prev === "newest" ? "oldest" : "newest")}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>{sortOrder === "newest" ? "Newest" : "Oldest"}</span>
            {sortOrder === "newest" ? (
              <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            ) : (
              <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Experience List - Brutalist Ledger Driven */}
      <div className="flex flex-col border-[3px] border-foreground mt-4">
        {filteredData.map((exp: any, index: number) => {
          const isEven = index % 2 === 0;
          const bgClass = isEven ? "bg-foreground text-background" : "bg-background text-foreground";
          const borderClass = index !== 0 ? "border-t-[3px] border-foreground" : "";
          
          return (
            <div 
              key={exp.id} 
              className={cn(
                "group relative flex flex-col md:flex-row gap-4 md:gap-8 py-8 md:py-10 px-6 transition-none",
                bgClass,
                borderClass
              )}
            >
              {/* Left Column: Date & Type */}
              <div className="md:w-1/4 shrink-0 flex flex-col gap-1 md:pt-1">
                <span className="font-mono text-sm font-black opacity-90">{exp.duration}</span>
                <span className="text-xs font-bold opacity-70 uppercase tracking-widest">{exp.type}</span>
              </div>
              
              {/* Right Column: Content */}
              <div className="flex-1 flex flex-col gap-2 relative">
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight md:group-hover:translate-x-2 transition-transform duration-300">
                  {exp.role}
                </h3>
                
                <div className="flex items-center gap-2 font-bold md:text-lg opacity-90 md:group-hover:translate-x-2 transition-transform duration-300 delay-75">
                  <span>{exp.company}</span>
                  {exp.address && (
                    <>
                      <span className="opacity-50 text-sm">•</span>
                      <span className="text-sm opacity-80">{exp.address}</span>
                    </>
                  )}
                </div>
                {exp.description && (
                  <p className="mt-2 text-sm md:text-base font-mono leading-relaxed opacity-80 max-w-3xl md:group-hover:translate-x-2 transition-transform duration-300 delay-100">
                    {exp.description}
                  </p>
                )}
                
                {/* Tech Stack */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4 md:group-hover:translate-x-2 transition-transform duration-300 delay-150">
                    {exp.technologies.map((tech: any) => (
                      <span key={tech} className="text-xs font-mono border-[2px] border-current px-2 py-1 uppercase font-bold opacity-80">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {filteredData.length === 0 && (
          <div className="text-muted-foreground italic py-8">
            No experiences found for this category.
          </div>
        )}
      </div>
    </div>
  );
}
