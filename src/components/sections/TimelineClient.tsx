"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { GitCommit } from "lucide-react";
import { cn } from "@/lib/utils";

export function TimelineClient({ changelogData }: { changelogData: any[] }) {
  // Extract unique project names, plus "ALL PROJECTS"
  const projects = React.useMemo(() => {
    const names = new Set(changelogData.map(c => c.project_name));
    return ["ALL PROJECTS", ...Array.from(names)];
  }, [changelogData]);

  const [activeProject, setActiveProject] = React.useState("ALL PROJECTS");

  const filteredData = React.useMemo(() => {
    if (activeProject === "ALL PROJECTS") return changelogData;
    return changelogData.filter((c) => c.project_name === activeProject);
  }, [changelogData, activeProject]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch {
      return dateString;
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'Feature': return "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800";
      case 'Bugfix': return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800";
      case 'Improvement': return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800";
      case 'Release': return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800";
      case 'Breaking Change': return "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800";
      default: return "bg-secondary text-secondary-text border-border";
    }
  };

  return (
    <div className="flex flex-col gap-10 w-full">
      {/* Project Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {projects.map((project) => {
          const isActive = activeProject === project;
          return (
            <button
              key={project}
              onClick={() => setActiveProject(project)}
              className={cn(
                "px-4 py-2 text-sm font-bold border-2 transition-all duration-200 uppercase tracking-wider rounded-xl",
                isActive 
                  ? "bg-accent border-accent text-white" 
                  : "bg-surface border-border text-secondary-text hover:border-accent/50 hover:text-foreground"
              )}
            >
              {project}
            </button>
          );
        })}
      </div>

      {/* Title indicating current project filter */}
      <h3 className="text-xl md:text-2xl font-bold uppercase tracking-widest border-b border-border pb-2">
        {activeProject}
      </h3>

      {/* Timeline List */}
      <div className="flex flex-col space-y-12 border-l-2 border-border/60 pl-8 ml-3 md:ml-4 mt-2">
        {filteredData.map((log: any) => (
          <div key={log.id} className="relative group animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Timeline Icon */}
            <div className="absolute -left-[49px] md:-left-[57px] w-12 h-12 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center ring-4 ring-background group-hover:scale-110 transition-transform duration-300">
              <GitCommit className="w-5 h-5 text-accent" />
            </div>
            
            {/* Content Card */}
            <div className="flex flex-col gap-3 p-5 md:p-6 rounded-2xl bg-surface border border-border shadow-sm hover:shadow-md transition-all duration-300 -mt-2">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-black dark:bg-white text-white dark:text-black font-mono font-bold text-sm px-3 py-1 hover:bg-black/90 dark:hover:bg-white/90">
                  {log.version}
                </Badge>
                
                <Badge variant="outline" className={cn("px-3 py-1 font-bold", getBadgeColor(log.type))}>
                  {log.type}
                </Badge>

                <Badge variant="outline" className="px-3 py-1 font-mono text-secondary-text bg-background/50 border-border">
                  {formatDate(log.date)}
                </Badge>
              </div>

              {activeProject === "ALL PROJECTS" && (
                <div className="text-xs font-bold text-accent uppercase tracking-widest mt-1">
                  Project: {log.project_name}
                </div>
              )}

              <p className="text-secondary-text mt-2 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                {log.description}
              </p>
            </div>
          </div>
        ))}
        {filteredData.length === 0 && (
          <div className="text-secondary-text italic p-4">
            No changelogs found.
          </div>
        )}
      </div>
    </div>
  );
}
