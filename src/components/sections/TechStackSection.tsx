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
        <div className="flex flex-col gap-2 border-b-[3px] border-foreground pb-4">
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground uppercase">Tech Stack</h3>
          <p className="text-foreground font-bold tracking-widest uppercase text-xs md:text-sm">
            TECHNOLOGIES, FRAMEWORKS, AND TOOLS I USE ON A DAILY BASIS.
          </p>
        </div>

        <TechStackClient techStackData={techStackData} projects={projects} />
        <WorkspaceSetup />
      </div>
    </section>
  );
}
