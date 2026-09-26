import * as React from "react";
import { TransitionLink as Link } from "@/components/layout/TransitionLink";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useTransitionStore } from "@/store/useTransitionStore";

export function ProjectCard({ project, isListView = false }: { project: any, isListView?: boolean }) {
  const setTransitionTitle = useTransitionStore(state => state.setTransitionTitle);

  const handleClick = () => {
    setTransitionTitle(project.title);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={cn(
          "group bg-background border-[3px] border-foreground overflow-hidden shadow-[8px_8px_0_0_var(--foreground)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_0_var(--foreground)] transition-all duration-200 cursor-pointer text-left",
          isListView ? "flex flex-col md:flex-row" : "flex flex-col"
        )}>
          <Link 
            href={`/projects/${project.id}`} 
            onClick={handleClick}
            className={cn(
              "block bg-surface relative overflow-hidden shrink-0",
              isListView ? "aspect-[16/9] w-full md:w-[40%] border-b-[3px] md:border-b-0 md:border-r-[3px] border-foreground" : "aspect-[16/9] w-full border-b-[3px] border-foreground"
            )}
          >
            {project.thumbnail ? (
              <Image 
                src={project.thumbnail} 
                alt={project.title}
                fill
                className="object-cover transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center font-black uppercase tracking-widest text-xs border-[3px] border-dashed border-foreground m-4 transition-transform duration-500 group-hover:scale-105">
                {project.title} Preview
              </div>
            )}
          </Link>
          <div className={cn("p-6 md:p-8 flex flex-col flex-1", isListView && "justify-center")}>
            <div className="flex flex-col xl:flex-row justify-between items-start gap-4 mb-6">
              <div className="flex flex-col gap-2">
                <Link href={`/projects/${project.id}`}>
                  <h4 className="font-black text-2xl md:text-3xl uppercase tracking-tighter text-foreground group-hover:text-accent transition-colors leading-none">
                    {project.title}
                  </h4>
                </Link>
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-foreground opacity-80">
                  <span>{project.category}</span>
                  <span className="w-1.5 h-1.5 bg-foreground" />
                  <span>{new Date(project.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
                </div>
              </div>
              <span className="border-[2px] border-foreground px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-surface shrink-0 shadow-[2px_2px_0_0_var(--foreground)]">
                {project.status}
              </span>
            </div>
            
            <p className="text-sm font-bold leading-relaxed mb-8 line-clamp-3">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {project.techStack.map((tech: any) => (
                <span key={tech} className="border-[2px] border-foreground bg-accent text-accent-foreground px-2 py-1 text-[10px] font-black uppercase tracking-widest">
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="flex flex-wrap items-center gap-4 mt-auto">
              {project.liveDemo && (
                <Link 
                  href={project.liveDemo} 
                  target="_blank" 
                  className="inline-flex items-center gap-2 px-4 py-2 border-[2px] border-foreground bg-foreground text-background hover:bg-accent hover:text-accent-foreground font-black uppercase tracking-widest text-xs transition-all shadow-[4px_4px_0_0_var(--foreground)] active:translate-y-1 active:shadow-none"
                >
                  <ExternalLink className="w-4 h-4 stroke-[3]" />
                  <span>Live Demo</span>
                </Link>
              )}
              {project.github && (
                <Link 
                  href={project.github} 
                  target="_blank" 
                  className="inline-flex items-center gap-2 px-4 py-2 border-[2px] border-foreground bg-surface text-foreground hover:bg-foreground hover:text-background font-black uppercase tracking-widest text-xs transition-all shadow-[4px_4px_0_0_var(--foreground)] active:translate-y-1 active:shadow-none"
                >
                  <FaGithub className="w-4 h-4" />
                  <span>Source</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent className="font-black uppercase tracking-widest border-[3px] border-foreground">Project: {project.title}</TooltipContent>
    </Tooltip>
  );
}
