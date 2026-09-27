"use client";

import { useEffect, useState, useMemo } from "react";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { useSettingsStore } from "@/store/settingsStore";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Filter } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function ProjectsGrid({ projects, showFilters = false }: { projects: any[], showFilters?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const { projectsView } = useSettingsStore();
  const [selectedTech, setSelectedTech] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const { dict } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Extract unique tech stacks
  const allTechStacks = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach(p => {
      if (Array.isArray(p.techStack)) {
        p.techStack.forEach((t: string) => techs.add(t));
      }
    });
    return ["All", ...Array.from(techs).sort()];
  }, [projects]);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let result = [...projects];

    if (selectedTech !== "All") {
      result = result.filter(p => p.techStack?.includes(selectedTech));
    }

    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [projects, selectedTech, sortOrder]);

  const isListView = mounted && projectsView === "list";

  return (
    <div className="flex flex-col gap-10">
      {showFilters && (
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between bg-surface p-6 border-[3px] border-foreground shadow-[8px_8px_0_0_var(--foreground)]">
          <div className="flex items-center gap-3 overflow-x-auto w-full lg:w-auto pb-4 lg:pb-0 scrollbar-hide">
            <div className="flex items-center gap-2 px-3 py-2 border-[3px] border-foreground bg-accent text-accent-foreground font-black uppercase tracking-widest text-xs shrink-0 shadow-[4px_4px_0_0_var(--foreground)] mr-2">
              <Filter className="w-4 h-4 stroke-[3]" />
              <span>Filter</span>
            </div>
            {allTechStacks.map(tech => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={cn(
                  "px-4 py-2 border-[3px] border-foreground font-black uppercase tracking-widest text-xs shrink-0 transition-all",
                  selectedTech === tech 
                    ? "bg-foreground text-background translate-y-1 shadow-none" 
                    : "bg-background text-foreground hover:bg-accent hover:text-accent-foreground hover:-translate-y-1 shadow-[4px_4px_0_0_var(--foreground)] active:translate-y-1 active:shadow-none"
                )}
              >
                {tech === "All" ? dict.projects.filterAll : tech}
              </button>
            ))}
          </div>
          
          <div className="shrink-0 w-full lg:w-auto flex items-center gap-4">
            <span className="font-black uppercase tracking-widest text-xs text-foreground hidden sm:block">{dict.projects.sortBy}:</span>
            <div className="relative w-full sm:w-auto">
              <select 
                value={sortOrder} 
                onChange={(e: any) => setSortOrder(e.target.value)}
                className="w-full sm:w-[180px] appearance-none px-4 py-3 bg-background border-[3px] border-foreground font-black uppercase tracking-widest text-xs shadow-[4px_4px_0_0_var(--foreground)] focus:outline-none cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <option value="newest">{dict.projects.newest}</option>
                <option value="oldest">{dict.projects.oldest}</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-foreground">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>
      )}

      <motion.div 
        layout
        className={cn(
          "grid gap-10",
          isListView ? "grid-cols-1" : "grid-cols-1 xl:grid-cols-2"
        )}
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project: any) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <ProjectCard project={project} isListView={isListView} />
            </motion.div>
          ))}
          {filteredProjects.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="col-span-full py-16 text-center font-black uppercase tracking-widest text-foreground bg-surface border-[3px] border-dashed border-foreground shadow-[8px_8px_0_0_var(--foreground)]"
            >
              {dict.projects.noProjects}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
