import * as React from "react";
import { TransitionLink as Link } from "@/components/layout/TransitionLink";
import { ArrowRight } from "lucide-react";
import { getProjects } from "@/data/projects";
import { ProjectsGrid } from "./ProjectsGrid";
import { ProjectsCoverflow } from "./ProjectsCoverflow";

export async function FeaturedProjectsSection({ showAll = false }: { showAll?: boolean }) {
  const projectsData = await getProjects();
  // Fetch a bit more for the coverflow if not showAll
  const featuredProjects = showAll ? projectsData : projectsData.filter((p: any) => p.featured).slice(0, 5);

  return (
    <section id="projects" className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both overflow-x-hidden">
      <div className="flex items-end justify-between mb-8">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold tracking-widest text-muted uppercase">SELECTED WORK</p>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            {showAll ? "All Projects" : "Work Gallery"}
          </h3>
          <p className="text-muted text-sm md:text-base max-w-xl mt-2">
            {showAll ? "A comprehensive list of my work, experiments, and open source contributions." : "A collection of systems, digital projects, and technical work I've built."}
          </p>
        </div>
        {!showAll && (
          <Link 
            href="/projects" 
            className="hidden md:flex items-center gap-1.5 text-sm font-medium text-foreground bg-secondary/20 hover:bg-surface px-6 py-3 rounded-none transition-colors border border-border"
          >
            View More Projects <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      <div className="w-full relative">
        {showAll ? (
          <div className="container mx-auto px-4 md:px-8">
            <ProjectsGrid projects={featuredProjects} showFilters={showAll} />
          </div>
        ) : (
          <ProjectsCoverflow projects={featuredProjects} />
        )}
      </div>
      
      {!showAll && (
        <div className="mt-6 md:hidden">
          <Link 
            href="/projects" 
            className="flex items-center justify-center gap-1.5 text-sm font-medium text-foreground bg-secondary/5 border border-border rounded-none py-3 hover:bg-secondary/10 transition-colors"
          >
            View More Projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </section>
  );
}
