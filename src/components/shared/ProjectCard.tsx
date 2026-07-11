import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HoverBadge } from "@/components/ui/HoverBadge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { RichText } from "@/components/ui/RichText";
import { cn } from "@/lib/utils";

export function ProjectCard({ project, isListView = false }: { project: any, isListView?: boolean }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Card className={cn(
          "group bg-surface border-border overflow-hidden rounded-[16px] hover:-translate-y-1 hover:shadow-md transition-all duration-300",
          isListView ? "flex flex-col md:flex-row" : "flex flex-col"
        )}>
          <Link 
            href={`/projects/${project.id}`} 
            className={cn(
              "block bg-secondary/10 relative overflow-hidden",
              isListView ? "aspect-[16/9] w-full md:w-1/3 md:border-r md:border-b-0 border-b border-border shrink-0" : "aspect-[16/9] w-full border-b border-border"
            )}
          >
            {project.thumbnail ? (
              <Image 
                src={project.thumbnail} 
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted font-medium bg-gradient-to-br from-secondary/5 to-secondary/20 group-hover:scale-105 transition-transform duration-500">
                {project.title} Preview
              </div>
            )}
          </Link>
          <CardContent className={cn("p-6 flex flex-col flex-1", isListView && "justify-center")}>
            <div className="flex justify-between items-start gap-4 mb-4">
              <div className="flex flex-col gap-1">
                <Link href={`/projects/${project.id}`}>
                  <h4 className="font-semibold text-lg text-foreground hover:text-accent transition-colors">
                    {project.title}
                  </h4>
                </Link>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span>{project.category}</span>
                  <span>•</span>
                  <span>{new Date(project.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
                </div>
              </div>
              <Badge variant="outline" className="text-xs bg-transparent shrink-0">
                {project.status}
              </Badge>
            </div>
            
            <RichText 
              content={project.description} 
              className="text-sm text-secondary-text mb-6 line-clamp-2" 
            />
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.techStack.map((tech: any) => (
                <HoverBadge key={tech} tech={tech} />
              ))}
            </div>
            
            <div className="flex items-center gap-4 mt-auto">
              {project.github && (
                <Link 
                  href={project.github} 
                  target="_blank" 
                  className="text-sm flex items-center gap-1.5 text-muted hover:text-foreground transition-colors"
                >
                  <FaGithub className="w-4 h-4" />
                  <span>Source</span>
                </Link>
              )}
              {project.liveDemo && (
                <Link 
                  href={project.liveDemo} 
                  target="_blank" 
                  className="text-sm flex items-center gap-1.5 text-accent hover:text-accent/80 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </TooltipTrigger>
      <TooltipContent>Project: {project.title}</TooltipContent>
    </Tooltip>
  );
}
