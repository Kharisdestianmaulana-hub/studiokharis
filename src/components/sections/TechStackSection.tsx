import * as React from "react";
import { getTechStack } from "@/data/tech-stack";
import { getProjects } from "@/data/projects";
import { TechStackClient } from "./TechStackClient";
import { WorkspaceSetup } from "./WorkspaceSetup";

export async function TechStackSection() {
  const techStackData = await getTechStack();
  const projects = await getProjects();
  return (
    <section id="tech-stack" className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold tracking-tight text-foreground">Tech Stack</h3>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl">
            Technologies, frameworks, and tools I use on a daily basis.
          </p>
        </div>

        <TechStackClient techStackData={techStackData} projects={projects} />
        <WorkspaceSetup />
      </div>
    </section>
  );
}
