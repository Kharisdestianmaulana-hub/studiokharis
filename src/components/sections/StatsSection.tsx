import * as React from "react";
import { getProjects } from "@/data/projects";
import { getTechStack } from "@/data/tech-stack";
import { getArticles } from "@/data/articles";
import { Card, CardContent } from "@/components/ui/card";
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
      description: "Tools in our arsenal",
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-surface border-border overflow-hidden rounded-[16px] group hover:border-primary/50 transition-colors">
              <CardContent className="p-6 md:p-8 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-4xl font-bold tracking-tight text-foreground mb-1">
                    {stat.value}
                  </h3>
                  <p className="font-medium text-foreground mb-1">{stat.label}</p>
                  <p className="text-sm text-secondary-text">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
