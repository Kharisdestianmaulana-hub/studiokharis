"use client";

import React from "react";
import { Roadmap } from "@/data/roadmaps";
import { CheckCircle2, Circle, Target, CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RoadmapsSectionProps {
  roadmaps: Roadmap[];
}

export function RoadmapsSection({ roadmaps }: RoadmapsSectionProps) {
  if (!roadmaps || roadmaps.length === 0) return null;

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Target className="w-6 h-6 text-accent" />
          Roadmaps
        </h2>
        <p className="text-sm text-secondary-text max-w-2xl">
          My goals and plans for the upcoming future. Here's what I'm currently working on or planning to achieve.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {roadmaps.map((roadmap) => {
          const totalTasks = roadmap.tasks.length;
          const completedTasks = roadmap.tasks.filter(t => t.done).length;
          const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

          return (
            <Card key={roadmap.$id} className="bg-surface border-border overflow-hidden">
              <CardHeader className="border-b border-border/50 bg-secondary/5 pb-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex flex-col gap-2">
                    <Badge variant="outline" className="w-fit flex items-center gap-1.5 text-xs font-medium bg-background">
                      <CalendarDays className="w-3.5 h-3.5" />
                      {roadmap.year}
                    </Badge>
                    <CardTitle className="text-lg font-semibold leading-tight text-foreground">
                      {roadmap.title}
                    </CardTitle>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-medium text-muted mb-1">{progress}%</span>
                    <div className="w-16 h-1.5 bg-secondary rounded-none overflow-hidden">
                      <div 
                        className="h-full bg-accent transition-all duration-1000 ease-out"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="flex flex-col gap-3">
                  {roadmap.tasks.map((task) => (
                    <li key={task.id} className="flex items-start gap-3">
                      {task.done ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted shrink-0 mt-0.5" />
                      )}
                      <span className={`text-sm ${task.done ? 'text-secondary-text line-through opacity-70' : 'text-foreground'}`}>
                        {task.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
