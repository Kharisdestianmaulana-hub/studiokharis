import * as React from "react";
import { getTechStack } from "@/data/tech-stack";
import { Badge } from "@/components/ui/badge";

export async function TechStackSection() {
  const techStackData = await getTechStack();
  return (
    <section id="tech-stack" className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold tracking-tight text-foreground">Tech Stack</h3>
          <p className="text-muted text-sm md:text-base max-w-xl">
            Technologies, frameworks, and tools I use on a daily basis.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          {techStackData.map((category: any) => (
            <div key={category.category} className="flex flex-col gap-6">
              <h4 className="text-xl font-bold tracking-widest uppercase text-foreground border-b border-border pb-2">
                {category.category}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((tech: any) => (
                  <div key={tech.name} className="flex flex-col gap-4 p-5 md:p-6 rounded-2xl bg-surface border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-base md:text-lg text-primary-text">{tech.name}</h3>
                      <div className="bg-accent/10 text-accent font-mono font-bold text-xs px-2.5 py-1 rounded-md border border-accent/20">
                        {tech.proficiency}%
                      </div>
                    </div>
                    <div className="h-2 w-full bg-secondary/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-accent transition-all duration-1000 ease-out rounded-full"
                        style={{ width: `${tech.proficiency}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
