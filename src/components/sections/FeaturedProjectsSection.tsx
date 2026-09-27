import * as React from "react";
import { TransitionLink as Link } from "@/components/layout/TransitionLink";
import { ArrowRight } from "lucide-react";
import { getProjects } from "@/data/projects";
import { ProjectsGrid } from "./ProjectsGrid";
import { ProjectsCoverflow } from "./ProjectsCoverflow";
import { getDictionary } from "@/lib/i18n";

export async function FeaturedProjectsSection({ showAll = false }: { showAll?: boolean }) {
  const projectsData = await getProjects();
  const dict = await getDictionary();
  // Fetch a bit more for the coverflow if not showAll
  const featuredProjects = showAll ? projectsData : projectsData.filter((p: any) => p.featured).slice(0, 5);

  return (
    <section id="projects" className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both overflow-x-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b-[3px] border-foreground pb-6">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-black tracking-widest text-foreground uppercase opacity-70">{dict.projects.selectedWork}</p>
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground uppercase">
            {showAll ? dict.projects.allProjects : dict.projects.workGallery}
          </h3>
          <p className="text-foreground font-bold tracking-widest uppercase text-xs md:text-sm mt-2">
            {showAll ? dict.projects.allDesc : dict.projects.featuredDesc}
          </p>
        </div>
        {!showAll && (
          <Link 
            href="/projects" 
            className="hidden md:flex items-center gap-2 text-sm font-black uppercase tracking-widest text-background bg-foreground hover:bg-foreground/90 px-8 py-4 transition-none mt-4 md:mt-0"
          >
            {dict.projects.viewMore} <ArrowRight className="w-5 h-5" />
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
            {dict.projects.viewMore} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </section>
  );
}
