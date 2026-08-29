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
      <div className="grid grid-cols-1 md:grid-cols-3 border-y border-border divide-y md:divide-y-0 md:divide-x divide-border">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="flex flex-col gap-4 p-8 md:p-10 group bg-transparent hover:bg-secondary/5 transition-colors">
              <div className="w-12 h-12 flex items-center group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-8 h-8 text-foreground" />
              </div>
              <div className="mt-4">
                <h3 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-2">
                  {stat.value}
                </h3>
                <p className="font-bold text-foreground mb-1 uppercase tracking-wider text-sm">{stat.label}</p>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
