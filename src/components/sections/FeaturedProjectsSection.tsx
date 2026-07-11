import * as React from "react";
import { TransitionLink as Link } from "@/components/layout/TransitionLink";
import { ArrowRight } from "lucide-react";
import { getProjects } from "@/data/projects";
import { ProjectsGrid } from "./ProjectsGrid";

export async function FeaturedProjectsSection({ showAll = false }: { showAll?: boolean }) {
  const projectsData = await getProjects();
  const featuredProjects = showAll ? projectsData : projectsData.filter((p: any) => p.featured).slice(0, 2);

  return (
    <section id="projects" className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
      <div className="flex items-end justify-between mb-8">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold tracking-tight text-foreground">
            {showAll ? "All Projects" : "Featured Projects"}
          </h3>
          <p className="text-muted text-sm md:text-base max-w-xl">
            {showAll ? "A comprehensive list of my work, experiments, and open source contributions." : "Some of my recent work that I'm most proud of."}
          </p>
        </div>
        {!showAll && (
          <Link 
            href="/projects" 
            className="hidden md:flex items-center gap-1.5 text-sm font-medium text-muted hover:text-foreground transition-colors"
          >
            View all projects <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      <ProjectsGrid projects={featuredProjects} showFilters={showAll} />
      
      {!showAll && (
        <div className="mt-6 md:hidden">
          <Link 
            href="/projects" 
            className="flex items-center justify-center gap-1.5 text-sm font-medium text-foreground bg-secondary/5 border border-border rounded-xl py-3 hover:bg-secondary/10 transition-colors"
          >
            View all projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </section>
  );
}
