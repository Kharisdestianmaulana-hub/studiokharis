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
      images: [{ url: project.ogImage, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: description,
      images: [project.ogImage],
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
    <article className="flex flex-col gap-10 pb-16 pt-8 animate-in fade-in duration-700">
      <SetTransitionTitle title={project.title} />
      
      {/* Brutalist Back Button */}
      <Link 
        href="/projects" 
        className="inline-flex items-center gap-2 font-black uppercase tracking-widest text-sm border-[3px] border-foreground px-4 py-2 bg-surface hover:bg-foreground hover:text-background transition-colors w-fit shadow-[4px_4px_0_0_var(--foreground)] active:translate-y-1 active:shadow-none"
      >
        <ArrowLeft className="w-5 h-5 stroke-[3]" />
        Back to projects
      </Link>

      <header className="flex flex-col gap-8 border-[3px] border-foreground bg-background p-6 md:p-10 shadow-[8px_8px_0_0_var(--foreground)]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-4 text-sm font-bold uppercase tracking-widest text-foreground">
            <span className="flex items-center gap-2 border-[2px] border-foreground px-3 py-1 bg-surface"><Tag className="w-4 h-4 stroke-[3]" /> {project.category}</span>
            <span className="flex items-center gap-2 border-[2px] border-foreground px-3 py-1 bg-surface"><Calendar className="w-4 h-4 stroke-[3]" /> {new Date(project.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
            <span className="border-[2px] border-foreground px-3 py-1 bg-accent text-accent-foreground shadow-[2px_2px_0_0_var(--foreground)]">{project.status}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground uppercase leading-none mt-2">
            {project.title}
          </h1>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech: any) => (
            <span key={tech} className="px-3 py-1.5 border-[3px] border-foreground bg-surface text-foreground font-black uppercase tracking-widest text-xs">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 items-center justify-between w-full mt-4 pt-6 border-t-[3px] border-foreground border-dashed">
          <div className="flex items-center gap-4">
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background border-[3px] border-foreground text-sm font-black uppercase tracking-widest hover:bg-background hover:text-foreground transition-all shadow-[4px_4px_0_0_var(--color-accent)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--color-accent)]"
              >
                <FaGithub className="w-5 h-5" />
                Source Code
              </a>
            )}
            {project.liveDemo && (
              <a 
                href={project.liveDemo} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-foreground border-[3px] border-foreground text-sm font-black uppercase tracking-widest hover:bg-background hover:text-foreground transition-all shadow-[4px_4px_0_0_var(--foreground)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--foreground)]"
              >
                <ExternalLink className="w-5 h-5 stroke-[3]" />
                Live Demo
              </a>
            )}
          </div>
          <ShareButtons url={`/projects/${project.id}`} title={project.title} />
        </div>
      </header>

      {project.images && project.images.length > 0 && (
        <div className="border-[3px] border-foreground shadow-[8px_8px_0_0_var(--foreground)] bg-background p-2">
          <ProjectGallery images={project.images} title={project.title} />
        </div>
      )}

      <div className="prose prose-neutral dark:prose-invert max-w-none p-6 md:p-10 border-[3px] border-foreground bg-background shadow-[8px_8px_0_0_var(--foreground)] prose-p:font-medium prose-p:leading-relaxed prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-img:border-[3px] prose-img:border-foreground prose-img:shadow-[6px_6px_0_0_var(--foreground)] prose-a:text-accent prose-a:font-bold prose-a:decoration-[3px] prose-a:underline-offset-4 prose-blockquote:border-l-[6px] prose-blockquote:border-foreground prose-blockquote:bg-surface prose-blockquote:p-4 prose-blockquote:font-bold prose-blockquote:not-italic prose-strong:font-black">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {project.description}
        </ReactMarkdown>
      </div>
    </article>
  );
}
