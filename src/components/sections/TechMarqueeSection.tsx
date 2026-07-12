"use client";

import * as React from "react";
import { FaReact, FaNodeJs, FaFigma, FaAws, FaDocker, FaPython } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiPostgresql, SiMongodb, SiFirebase } from "react-icons/si";

const techIcons = [
  { name: "React", Icon: FaReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "Node.js", Icon: FaNodeJs },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "Firebase", Icon: SiFirebase },
  { name: "AWS", Icon: FaAws },
  { name: "Docker", Icon: FaDocker },
  { name: "Python", Icon: FaPython },
  { name: "Figma", Icon: FaFigma },
];

// Duplicate the array twice (total 3x) to create a seamless infinite loop
const marqueeItems = [...techIcons, ...techIcons, ...techIcons];

export function TechMarqueeSection() {
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
              {marqueeItems.map((tech, index) => (
                <div 
                  key={`${tech.name}-${index}`} 
                  className="flex items-center gap-3 group opacity-70 hover:opacity-100 transition-opacity cursor-default"
                >
                  <tech.Icon className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <span className="font-semibold text-lg md:text-xl text-muted-foreground group-hover:text-foreground transition-colors">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
