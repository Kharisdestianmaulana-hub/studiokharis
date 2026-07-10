"use client";

import { useEffect, useState } from "react";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { useSettingsStore } from "@/store/settingsStore";
import { cn } from "@/lib/utils";

export function ProjectsGrid({ projects }: { projects: any[] }) {
  const [mounted, setMounted] = useState(false);
  const { projectsView } = useSettingsStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Before hydration, default to grid view to avoid layout shift for grid lovers, 
  // or just render it as grid and change if needed.
  const isListView = mounted && projectsView === "list";

  return (
    <div 
      className={cn(
        "grid gap-6",
        isListView ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
      )}
    >
      {projects.map((project: any) => (
        <ProjectCard key={project.id} project={project} isListView={isListView} />
      ))}
    </div>
  );
}
