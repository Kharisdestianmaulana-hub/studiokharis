import * as React from "react";
import { getProjects } from "@/data/projects";
import { getTechStack } from "@/data/tech-stack";
import { getArticles } from "@/data/articles";

import { Layers, Code2, BookOpen } from "lucide-react";

export async function StatsSection() {
  const [projects, techStack, articles] = await Promise.all([
    getProjects(),
    getTechStack(),
    getArticles()
  ]);
  
  const projectsCount = projects.length;
  const techStackCount = techStack.reduce((total, category) => total + category.items.length, 0);
  const articlesCount = articles.length;

  const stats = [
    {
      label: "Projects Completed",
      value: `${projectsCount}`,
      icon: Code2,
      description: "Delivered with excellence",
    },
    {
      label: "Technologies Mastered",
      value: `${techStackCount}+`,
      icon: Layers,
      description: "Tools in my arsenal",
    },
    {
      label: "Published Articles",
      value: `${articlesCount}`,
      icon: BookOpen,
      description: "Insights and tutorials",
    },
  ];

  return (
    <section className="py-2">
      <div className="grid grid-cols-1 md:grid-cols-3 border-[3px] border-foreground">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isMiddle = index === 1;
          
          // Alternating checkerboard style
          const bgClass = isMiddle ? "bg-background text-foreground" : "bg-foreground text-background";
          const borderClass = isMiddle ? "border-y-[3px] md:border-y-0 md:border-x-[3px] border-foreground" : "";
          
          return (
            <div key={index} className={`flex flex-col gap-4 p-8 md:p-12 transition-none ${bgClass} ${borderClass}`}>
              <div className="w-12 h-12 flex items-center">
                <Icon className="w-8 h-8 opacity-90" />
              </div>
              <div className="mt-4">
                <h3 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-2">
                  {stat.value}
                </h3>
                <p className="font-bold mb-1 uppercase tracking-widest text-xs md:text-sm">{stat.label}</p>
                <p className="text-xs font-mono opacity-70 uppercase">{stat.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
