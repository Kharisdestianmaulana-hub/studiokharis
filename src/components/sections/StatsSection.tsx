import * as React from "react";
import { getProjects } from "@/data/projects";
import { getExperiences } from "@/data/experience";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Code2, Users } from "lucide-react";

export async function StatsSection() {
  const projects = await getProjects();
  const experiences = await getExperiences();
  
  // Calculate years of experience
  let earliestYear = new Date().getFullYear();
  experiences.forEach((exp: any) => {
    const match = exp.duration.match(/\b(19|20)\d{2}\b/);
    if (match) {
      const year = parseInt(match[0]);
      if (year < earliestYear) earliestYear = year;
    }
  });
  const yearsExp = Math.max(1, new Date().getFullYear() - earliestYear);
  const projectsCount = Math.max(10, projects.length); // Fallback to 10+ if db is small

  const stats = [
    {
      label: "Projects Completed",
      value: `${projectsCount}+`,
      icon: Code2,
      description: "Delivered with excellence",
    },
    {
      label: "Years Experience",
      value: `${yearsExp}+`,
      icon: Trophy,
      description: "Proven track record",
    },
    {
      label: "Client Satisfaction",
      value: "100%",
      icon: Users,
      description: "Consistent 5-star ratings",
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
