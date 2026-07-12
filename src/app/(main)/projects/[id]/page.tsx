import * as React from "react";
import { TransitionLink as Link } from "@/components/layout/TransitionLink";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Calendar, Tag } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getProjects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { ProjectGallery } from "@/components/shared/ProjectGallery";
import { SetTransitionTitle } from "@/components/layout/SetTransitionTitle";
import { ShareButtons } from "@/components/shared/ShareButtons";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project: any) => ({
    id: project.id,
  }));
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const projects = await getProjects();
  const project = projects.find((p: any) => p.id === params.id);
  
  if (!project) return { title: "Project Not Found" };
  
  const description = project.description?.substring(0, 160) || "Project details";
  return {
    title: project.title,
    description: description,
    openGraph: {
      title: project.title,
      description: description,
      images: [{ url: project.thumbnail, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: description,
      images: [project.thumbnail],
    },
  };
}

export default async function ProjectDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const projects = await getProjects();
  const project = projects.find((p: any) => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <article className="flex flex-col gap-8 pb-16 pt-8 animate-in fade-in duration-700">
      <SetTransitionTitle title={project.title} />
      <Link 
        href="/projects" 
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to projects
      </Link>

      <header className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
            <span className="flex items-center gap-1.5"><Tag className="w-4 h-4" /> {project.category}</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(project.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
            <span>•</span>
            <Badge variant="outline">{project.status}</Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{project.title}</h1>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech: any) => (
            <Badge key={tech} variant="secondary" className="bg-surface border border-border text-secondary-text shadow-sm">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 items-center justify-between w-full mt-2">
          <div className="flex items-center gap-4">
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border text-sm font-medium hover:bg-secondary/10 transition-colors"
              >
                <FaGithub className="w-4 h-4" />
                Source Code
              </a>
            )}
            {project.liveDemo && (
              <a 
                href={project.liveDemo} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
          </div>
          <ShareButtons url={`/projects/${project.id}`} title={project.title} />
        </div>
      </header>

      {project.images && project.images.length > 0 && (
        <ProjectGallery images={project.images} title={project.title} />
      )}

      <div className="prose prose-neutral dark:prose-invert max-w-none prose-p:leading-relaxed prose-headings:font-bold prose-img:rounded-xl prose-a:text-accent mt-4">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {project.description}
        </ReactMarkdown>
      </div>
    </article>
  );
}
