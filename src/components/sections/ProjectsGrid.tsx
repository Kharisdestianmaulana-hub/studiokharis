"use client";

import { useEffect, useState, useMemo } from "react";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { useSettingsStore } from "@/store/settingsStore";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

export function ProjectsGrid({ projects, showFilters = false }: { projects: any[], showFilters?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const { projectsView } = useSettingsStore();
  const [selectedTech, setSelectedTech] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

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
    <div className="flex flex-col gap-6">
      {showFilters && (
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-card p-4 rounded-2xl border border-border">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-hide">
            <Filter className="w-4 h-4 text-muted-foreground mr-1 shrink-0" />
            {allTechStacks.map(tech => (
              <Button
                key={tech}
                variant={selectedTech === tech ? "default" : "secondary"}
                size="sm"
                className="rounded-full shrink-0"
                onClick={() => setSelectedTech(tech)}
              >
                {tech}
              </Button>
            ))}
          </div>
          <div className="shrink-0 w-full sm:w-auto">
            <Select value={sortOrder} onValueChange={(val: any) => setSortOrder(val)}>
              <SelectTrigger className="w-full sm:w-[140px] h-9">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <motion.div 
        layout
        className={cn(
          "grid gap-6",
          isListView ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
        )}
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project: any) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <ProjectCard project={project} isListView={isListView} />
            </motion.div>
          ))}
          {filteredProjects.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="col-span-full py-12 text-center text-muted-foreground bg-secondary/5 border border-dashed border-border rounded-2xl"
            >
              No projects found for the selected filter.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
