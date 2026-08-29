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
    <section className="py-12">
      <div className="flex flex-col gap-8 md:gap-16">
        <div className="flex flex-col gap-2">
          <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground uppercase">Technologies I Use</h3>
          <p className="text-muted-foreground font-bold tracking-widest uppercase text-xs md:text-sm">
            MODERN TOOLS FOR MODERN PROBLEMS.
          </p>
        </div>
        
        {/* Break out of container to span full width */}
        <div className="w-[200vw] relative left-1/2 -translate-x-1/2 flex items-center bg-foreground text-background border-y-[3px] border-foreground py-6 md:py-8 transform -rotate-2 my-8 shadow-2xl z-10 overflow-hidden">
          {/* Marquee track */}
          <div className="flex w-max animate-marquee hover-pause" style={{ animationDuration: '40s' }}>
            <div className="flex gap-8 md:gap-16 items-center whitespace-nowrap px-6 md:px-12">
              {marqueeItems.map((tech, index) => {
                const { icon: Icon } = getTechIcon(tech.name);
                return (
                  <div 
                    key={`${tech.name}-${index}`} 
                    className="flex items-center gap-4 md:gap-6 group cursor-default"
                  >
                    <Icon className="w-10 h-10 md:w-12 md:h-12" />
                    <span className="font-black text-2xl md:text-4xl uppercase tracking-widest">
                      {tech.name}
                    </span>
                    <span className="text-2xl md:text-4xl font-black opacity-30 ml-4 md:ml-10">///</span>
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
