import * as React from "react";
import { getTechStack } from "@/data/tech-stack";
import { getTechIcon } from "@/lib/tech-icons";

export async function TechMarqueeSection() {
  const techStackData = await getTechStack();
  
  // Flatten all tech items from categories
  const allTechs = techStackData.flatMap((cat: any) => cat.items);
  
  // If no techs found in DB, fallback to an empty array or handled gracefully
  if (!allTechs || allTechs.length === 0) return null;

  // Duplicate to create seamless loop
  const marqueeItems = [...allTechs, ...allTechs, ...allTechs];

  return (
    <section className="py-2 overflow-hidden">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold tracking-tight text-foreground">Technologies We Use</h3>
          <p className="text-muted text-sm md:text-base">
            Modern tools for modern problems.
          </p>
        </div>
        
        <div className="relative w-full overflow-hidden flex items-center bg-surface border-y border-border py-8">
          {/* Fading edges for smooth transition */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-surface to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-surface to-transparent z-10"></div>
          
          {/* Marquee track */}
          <div className="flex w-max animate-marquee hover-pause">
            <div className="flex gap-12 md:gap-24 items-center whitespace-nowrap px-6 md:px-12">
              {marqueeItems.map((tech, index) => {
                const { icon: Icon, color } = getTechIcon(tech.name);
                return (
                  <div 
                    key={`${tech.name}-${index}`} 
                    className="flex items-center gap-3 group opacity-70 hover:opacity-100 transition-opacity cursor-default"
                  >
                    <Icon className="w-8 h-8 md:w-10 md:h-10 transition-colors" style={{ color }} />
                    <span className="font-semibold text-lg md:text-xl text-muted-foreground group-hover:text-foreground transition-colors">
                      {tech.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
